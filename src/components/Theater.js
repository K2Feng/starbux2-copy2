import '../App.css';
import { useContext, useState, Suspense, useRef } from 'react';
import { Canvas, extend, useThree, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei/core/useGLTF';
import { OrbitControls } from "@react-three/drei";
import { softShadows } from "@react-three/drei";
import { createUseStyles } from 'react-jss';
import Can from './Can3.js';
import Box from './Box.js';

const useStyles = createUseStyles({
  wrapper: {
    border: 'lightgrey solid 1px',
    margin: 20,
    padding: 25,
    position: 'relative',
    textAlign: 'center',
    textTransform: 'capitalize',
  }
});

softShadows();

const value = 2;

function Random({...props }) {
  const group = useRef();
  const { nodes, materials } = useGLTF('./random4.gltf');
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh castShadow receiveShadow geometry={nodes.Cube.geometry} material={materials.Material}/>
    </group>
  )}

const AnimateFrame = (props) => {
//  useFrame(({ clock }) => {
//    props.meshRef.current.rotation.x += 0.01;
//  });
  useFrame((state, delta) => {
    props.meshRef.current.rotation.x += 0.01;
    // adjust camera position
    const newPosition = props.value*5;
    state.camera.position.z = newPosition;
  });
  return null;
};

export default function Theater() {
  const classes = useStyles();
  const myMesh = useRef();
  const defaultScale = 1.0;
  const [randomShapeScale, setRandomShapeScale] = useState(defaultScale);
  return (
    <div className = {classes.wrapper} style={{padding: 10}}>
      <Canvas shadows camera={{ position: [10, 10, 15], fov: 60}}>
        <OrbitControls target={[-3, 0, -3]} />
        <ambientLight intensity={0.5} />
        <directionalLight
          castShadow
          position={[2.5, 8, 5]}
          intensity={1.5}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        <Suspense fallback={null}>
          <Can scale={0.3} position={[0, -1, 0]}/>
          <mesh receiveShadow castShadow
            scale={0.5}
            ref={myMesh}>
            <boxGeometry />
            <meshBasicMaterial color={"#00ff00"} />
          </mesh>
          <AnimateFrame value={value} meshRef={myMesh}/>
          <Box scale={7} position={[-2.2, 2, 0]} />
          <Random value={value} scale={randomShapeScale} position ={[2.5,0,0]}/>
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
            <planeBufferGeometry attach="geometry" args={[100, 100]} />
            <shadowMaterial attach="material" transparent opacity={0.4} />
          </mesh>
        </Suspense>
      </Canvas>
    </div>
)
}
