import React from 'react';
import React3 from 'react-three-renderer-fiber';
import * as THREE from 'three';
import PropTypes from 'prop-types';

class Simple extends React.Component {
    static propTypes = {
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
    };

    constructor(props, context) {
        super(props, context);

        this.cameraPosition = new THREE.Vector3(0, 0, 5);

        // construct the position vector here, because if we use 'new' within render,
        // React will think that things have changed when they have not.

        this.state = {
            cubeRotation: new THREE.Euler(),
        };

        this._onAnimate = () => {
            // we will get this callback every frame

            // pretend cubeRotation is immutable.
            // this helps with updates and pure rendering.
            // React will be sure that the rotation has now updated.
            this.setState({
                cubeRotation: new THREE.Euler(
                    this.state.cubeRotation.x + 0.1,
                    this.state.cubeRotation.y + 0.1,
                    0
                ),
            });

            requestAnimationFrame(this._onAnimate);
        };
    }

    componentDidMount() {
        requestAnimationFrame(this._onAnimate);
    }

    render() {
        const {
            width,
            height,
        } = this.props;

        // or you can use:
        // width = window.innerWidth
        // height = window.innerHeight

        return (<React3>
            <webGLRenderer
                width={width}
                height={height}
            >
                <render
                    // onAnimationFrame={this._onAnimate}
                    camera={<perspectiveCamera
                        name="camera"
                        fov={75}
                        aspect={width / height}
                        near={0.1}
                        far={1000}

                        position={this.cameraPosition}
                    />}
                    scene={<scene>
                        <mesh
                            rotation={this.state.cubeRotation}
                        >
                            <boxGeometry
                                width={1}
                                height={1}
                                depth={1}
                            />
                            <meshBasicMaterial
                                color={0x00ff00}
                            />
                        </mesh>
                    </scene>
                    }
                />
            </webGLRenderer>
        </React3>);
    }
}

export default Simple;