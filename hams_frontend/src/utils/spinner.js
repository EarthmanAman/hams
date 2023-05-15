import React from "react";
import { ThreeDots } from "react-loader-spinner";

class SpinnerComponent extends React.Component {
    render() {
        return (
            <div className="spinner">
                <ThreeDots
                    ariaLabel="Please wait as we log you in ..."
                    color="#00BFFF"
                    height={100}
                    width={100}
                    timeout={4000} //3 secs
                    visible={this.props.spinner}

                />
            </div>

        )
    }
}

export default SpinnerComponent