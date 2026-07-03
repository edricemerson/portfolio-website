import './App.css'
import { ShaderGradient,ShaderGradientCanvas } from '@shadergradient/react'
import Navbar from './assets/page/Navbar'
import About from './assets/page/About'
import Experience from './assets/page/Experience'
import Education from './assets/page/Education'
import Footer from './assets/page/Footer'

function App() {
    return (
        <>
            <ShaderGradientCanvas
                style={{ position: 'fixed', inset: 0 }}
                pixelDensity={1.5}
                fov={20}
                pointerEvents="none"
            >
                <ShaderGradient
                    animate="on"
                    brightness={0.7}
                    cAzimuthAngle={177}
                    cDistance={13.99}
                    cPolarAngle={84}
                    cameraZoom={10}
                    color1="#000000"
                    color2="#e3fff6"
                    color3="#ffffe6"
                    envPreset="city"
                    grain="off"
                    lightType="3d"
                    positionX={-0.1}
                    positionY={0.1}
                    positionZ={0}
                    range="disabled"
                    rangeEnd={40}
                    rangeStart={0}
                    reflection={0.1}
                    rotationX={0}
                    rotationY={0}
                    rotationZ={235}
                    shader="defaults"
                    type="waterPlane"
                    uAmplitude={0}
                    uDensity={0.7}
                    uFrequency={5.5}
                    uSpeed={0.1}
                    uStrength={2}
                    uTime={0.2}
                    wireframe={false}
                    zoomOut={true}
                />
            </ShaderGradientCanvas>

            <div className="relative z-10">
                <Navbar />
                <About />
                <Experience />
                <Education />
                <Footer />
            </div>
        </>
    )
}
export default App