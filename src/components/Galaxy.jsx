import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Galaxy() {
  const galaxyRef = useRef();

  useEffect(() => {
    // constants
    const PARTICLE_COUNT = 1000;
    const INIT_CAMERA_POS = 500;
    const currentGalaxy = galaxyRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    const particles = new THREE.BufferGeometry();
    const particleMaterial = new THREE.PointsMaterial({ color: 0xffffff });
    const mouse = new THREE.Vector2();
    const targetRotation = new THREE.Vector2();

    let targetZ = INIT_CAMERA_POS;
    let isMobile = window.innerWidth < 640;
    let zoomIn = true;

    // init
    camera.position.z = INIT_CAMERA_POS;
    renderer.setSize(window.innerWidth, window.innerHeight);
    galaxyRef.current.appendChild(renderer.domElement);

    // generate stars
    const particlesData = new Float32Array(PARTICLE_COUNT * 3); // 3 for xyz coords

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particlesData[i * 3] = getRandomCoord(); // x
      particlesData[i * 3 + 1] = getRandomCoord(); // y
      particlesData[i * 3 + 2] = getRandomCoord(); // z
    }

    particles.setAttribute(
      "position",
      new THREE.BufferAttribute(particlesData, 3)
    );

    const particleSystem = new THREE.Points(particles, particleMaterial);
    scene.add(particleSystem);

    // mouse movement
    function onMouseMove(event) {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    }

    window.addEventListener("mousemove", onMouseMove, false);

    // Set an interval to smoothly zoom in and out
    const zoomInterval = setInterval(() => {
      const change = zoomIn ? 1 : -1;
      targetZ += change;

      if (targetZ >= 300) {
        zoomIn = false;
      } else if (targetZ <= -150) {
        zoomIn = true;
      }
    }, 90);

    // main
    function animate() {
      requestAnimationFrame(animate);

      // if the user is on a mobile device then auto-rotate
      if (isMobile) {
        targetRotation.x += 0.001;
        targetRotation.y += 0.001;
      } else {
        targetRotation.x = mouse.y * 0.2;
        targetRotation.y = mouse.x * 0.2;
      }

      particleSystem.rotation.x +=
        (targetRotation.x - particleSystem.rotation.x) * 0.05;
      particleSystem.rotation.y +=
        (targetRotation.y - particleSystem.rotation.y) * 0.05;

      // lerp camera position
      camera.position.z += (targetZ - camera.position.z) * 0.01;

      renderer.render(scene, camera);
    }
    animate();

    function getRandomCoord() {
      return Math.random() * 800 - 400;
    }

    // clean up when unmounting
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      clearInterval(zoomInterval);
      if (currentGalaxy) {
        currentGalaxy.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={galaxyRef} id="galaxy" />;
}
