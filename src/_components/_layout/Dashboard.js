import React, { Component } from "react";
import Formula from "../_functional/Formula";
import Graph from "../_functional/Graph";

class Dashboard extends Component {
  render() {
    return (
      <div class="container">
        <div class="row">
          <div class="col-sm text-left">
            <Graph />
          </div>
          <div class="col-sm text-right">
            <Formula />
          </div>
        </div>
      </div>
      // <div className="dashboard">
      //   <div className="dark-overlay dashboard-inner text-light">
      //     <div className="container">
      //       <div className="row">
      //         <div className="col-sm-8 text-left">
      //           <Graph />
      //         </div>
      //         <div className="col-sm-8 text-center">
      //           <Formula />
      //         </div>
      //       </div>
      //     </div>
      //   </div>
      // </div>
    );
  }
}

export default Dashboard;
