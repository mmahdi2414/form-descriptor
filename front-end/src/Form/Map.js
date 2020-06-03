import React from 'react';
import GoogleMapReact from 'google-map-react';
import { Modal, Button } from 'antd';

class MapModal extends React.Component{
    constructor(props){
        super(props);
        this.state={marker:{}};
    }
    render(){
        return (
            <Modal
            onCancel={this.props.onClose}
            visible={this.props.visible}
            title={this.props.title}
            footer={[
                <Button
                key="submit"
                type="primary"
                disabled={!this.state.marker.lng}
                onClick={() => this.props.onSubmit({
                    lat: this.state.marker.lat,
                    long: this.state.marker.lng,
                })}
                >
                تایید
                </Button>,
            ]}
            >
            <div style={{ height: 400 }}>
                <GoogleMapReact
                    options={{ fullscreenControl: false }}
                    onClick={({ lat, lng }) => this.setState({marker:{ lat, lng }})}
                    bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_API_KEY}}
                    defaultCenter={{
                        lat:35.59,
                        lng:51.44
                    }}
                    defaultZoom={11}
                >
                {this.state.marker.lng && (
                    <div
                    style={{
                        height: 5,
                        width: 5,
                        borderRadius: 10,
                        backgroundColor: 'red',
                    }}
                    lat={this.state.marker.lat}
                    lng={this.state.marker.lng}
                    />
                )}
                </GoogleMapReact>
            </div>
            </Modal>
        );
    }
}
export default MapModal;
