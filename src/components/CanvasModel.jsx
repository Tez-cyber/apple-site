import { Canvas } from '@react-three/fiber'
import { View } from "@react-three/drei";
import { useErrorBoundary } from 'use-error-boundary'


const CanvasModel = () => {
    const { ErrorBoundary, didCatch, error } = useErrorBoundary()
    return didCatch ? (
        <div>{error.message}</div>
    ) : (
        <ErrorBoundary>
            <Canvas>
                <View.port />
            </Canvas>
        </ErrorBoundary>
    )
}

export default CanvasModel