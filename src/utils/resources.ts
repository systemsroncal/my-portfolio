import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { SRGBColorSpace, TextureLoader } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import EventEmitter from "./EventEmitter";
import { sources } from "../sources";

import type { Texture } from "three";
import type { GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";

const isProd = import.meta.env.PROD;

type ResourceType = Texture | GLTF;

class Resources extends EventEmitter<{
  ready: void;
  progress: number;
  error: { name: string; message: string };
}> {
  toLoad = sources.length;
  isReady = false;
  loaded = 0;
  failed = 0;
  items: Record<string, any> = {};
  errors: { name: string; message: string }[] = [];

  loaders: {
    gltfLoader: GLTFLoader;
    textureLoader: TextureLoader;
    fontLoader: FontLoader;
  };

  constructor() {
    super();

    this.loaders = {
      gltfLoader: new GLTFLoader(),
      textureLoader: new TextureLoader(),
      fontLoader: new FontLoader(),
    };
  }

  get progress() {
    return this.loaded / this.toLoad;
  }

  startLoading() {
    if (this.isReady || this.loaded > 0) return;

    for (const source of sources) {
      if (source.type === "gltfModel") {
        this.loaders.gltfLoader.load(
          source.path,
          (file) => {
            this.sourceLoaded(source, file);
          },
          undefined,
          (error) => {
            this.sourceFailed(source, error);
          },
        );
      } else if (source.type === "texture") {
        this.loaders.textureLoader.load(
          source.path,
          (file: Texture) => {
            file.colorSpace = SRGBColorSpace;
            this.sourceLoaded(source, file);
          },
          undefined,
          (error) => {
            this.sourceFailed(source, error);
          },
        );
      }
    }
  }

  sourceLoaded(source: { name: string; type: string; path: string }, file: ResourceType) {
    this.items[source.name] = file;
    this.loaded++;
    this.emitProgress();
  }

  sourceFailed(source: { name: string; type: string; path: string }, error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    const entry = { name: source.name, message };
    this.errors.push(entry);
    this.failed++;
    this.loaded++;
    console.error(`[Resources] Failed to load "${source.name}"`, error);
    this.emit("error", entry);
    this.emitProgress();
  }

  emitProgress() {
    const progress = this.loaded / this.toLoad;
    this.emit("progress", progress);

    if (this.loaded === this.toLoad) {
      this.isReady = true;
      this.emit("ready");
      this.log(this.failed > 0 ? `Loaded with ${this.failed} error(s)` : "All resources loaded");
    }
  }

  log(message: string) {
    if (isProd) return;
    console.log(`[Resources] ${message}`);
  }
}

export const resources = new Resources();
resources.startLoading();
