import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export class Viewer {
  //@ts-ignore
  container: HTMLCanvasElement;
  //@ts-ignore
  renderer: THREE.WebGLRenderer;
  //@ts-ignore
  scene: THREE.Scene;
  //@ts-ignore
  camera: THREE.PerspectiveCamera;
  //@ts-ignore
  grid: THREE.GridHelper;
  //@ts-ignore
  axes: THREE.AxesHelper;
  //@ts-ignore
  controls: OrbitControls;

  constructor() {}

  init = (container: any) => {
    const pixelRatio = window.devicePixelRatio;
    const width = container.offsetWidth;
    const height = container.offsetHeight;
    const aspect = width / height;

    this.container = container;

    // сцена
    this.scene = new THREE.Scene();

    // рендерер
    this.renderer = new THREE.WebGLRenderer({
      canvas: container,
      antialias: true,
    });
    // цвет внещней области
    this.renderer.setClearColor(0x333333);
    this.renderer.setPixelRatio(pixelRatio);
    this.renderer.setSize(width, height);

    // камера
    this.camera = new THREE.PerspectiveCamera(40, aspect, 1, 1000);
    this.camera.position.set(15, 20, 30);

    this.scene.add(this.camera);

    // сетка Х,Y,Z размером 30 единиц
    this.grid = new THREE.GridHelper(30, 30, 0x888888, 0x888888);
    this.scene.add(this.grid);

    this.axes = new THREE.AxesHelper(20);
    this.scene.add(this.axes);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.minDistance = 5;
    this.controls.maxDistance = 100;
    this.controls.update();

    // внешняя окружность
    const arcShape = new THREE.Shape();
    arcShape.absarc(0, 0, 10, 0, Math.PI * 2, false);
    // внутреняя окружность
    const innerHole = new THREE.Path();
    innerHole.absarc(0, 0, 2, 0, Math.PI * 2, true);
    // добваляем внутренюю окружность к внещней
    arcShape.holes.push(innerHole);

    // выдавливаем область внешней окружности без включения внутренней окружность
    const extrudeGeometry = new THREE.ExtrudeBufferGeometry(arcShape, {
      depth: 0.01,
      curveSegments: 100,
      bevelEnabled: false,
    });

    // поворачиваем цилиндр относительно оси Х
    extrudeGeometry.rotateX(-Math.PI * 0.5);

    // получаем объект цилиндра
    const cylinder = new THREE.Mesh(
      extrudeGeometry,
      new THREE.MeshNormalMaterial()
    );

    // рендерим
    this.scene.add(cylinder);

    window.addEventListener("resize", this.onResize);
    this.renderer.setAnimationLoop(this.render);
  };

  render = () => {
    this.renderer.render(this.scene, this.camera);
  };

  animate = () => {
    requestAnimationFrame(this.animate);
    this.render();
  };

  onResize = () => {
    const parent = this.container.parentNode as HTMLDivElement;

    this.camera.aspect = parent.offsetWidth / parent.offsetHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(parent.offsetWidth, parent.offsetHeight);
    this.render();
  };
}
