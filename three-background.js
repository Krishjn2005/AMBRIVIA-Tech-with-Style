// Three.js scene setup
let scene, camera, renderer;
let laptop, smartphone, tablet;
const objects = [];

// Initialize Three.js scene
function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#bg-canvas'),
        antialias: true,
        alpha: true
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);
    
    // Load 3D models
    const loader = new THREE.GLTFLoader();
    
    // Load laptop model
    loader.load(
        'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Laptop/glTF/Laptop.gltf',
        function(gltf) {
            laptop = gltf.scene;
            laptop.scale.set(0.5, 0.5, 0.5);
            laptop.position.set(-2, 0, -5);
            scene.add(laptop);
            objects.push(laptop);
        }
    );
    
    // Load smartphone model
    loader.load(
        'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/SmartPhone/glTF/SmartPhone.gltf',
        function(gltf) {
            smartphone = gltf.scene;
            smartphone.scale.set(0.3, 0.3, 0.3);
            smartphone.position.set(2, 0, -5);
            scene.add(smartphone);
            objects.push(smartphone);
        }
    );
    
    // Add floating particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 2000;
    const posArray = new Float32Array(particlesCount * 3);
    
    for(let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 50;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.005,
        color: 0x8b4513 // Brown color matching theme
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    camera.position.z = 15;
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    
    // Rotate objects
    objects.forEach(obj => {
        if(obj) {
            obj.rotation.y += 0.005;
        }
    });
    
    // Mouse movement effect
    if(mouseX && mouseY) {
        camera.position.x += (mouseX - camera.position.x) * 0.05;
        camera.position.y += (-mouseY - camera.position.y) * 0.05;
        camera.lookAt(scene.position);
    }
    
    renderer.render(scene, camera);
}

// Handle window resize
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Mouse movement tracking
let mouseX = 0;
let mouseY = 0;

function onDocumentMouseMove(event) {
    mouseX = (event.clientX - window.innerWidth / 2) / 100;
    mouseY = (event.clientY - window.innerHeight / 2) / 100;
}

// Initialize everything
window.addEventListener('resize', onWindowResize);
document.addEventListener('mousemove', onDocumentMouseMove);

init();
animate();