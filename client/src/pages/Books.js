import React, { Component } from 'react';
import Teacherheader from "../components/Teacherheader";
import { Menubar } from "../components/Menubar";
import { Document, Page } from 'react-pdf';
import "../resources/ukgbook.pdf";

class Booklist extends Component {
    state = {
        numPages: null,
        pageNumber: 1
    }
    onDocumentLoadSuccess = ({ numPages }) => {
        this.setState({ numPages });
      }

    render() {
        const {pageNumber,numPages } = this.state;
        return (<div>
            <Teacherheader />
            <div className="container middlecontent">
                <div className="row" >
                    <div className="col-lg-1 col-md-1 col-sm-12">
                        <Menubar />
                    </div>
                    <div className="col-lg-11 col-md-11 col-sm-12">
                       <h4 className = "subhead">Suggested Books</h4>
                        
                    <embed src="ukgbook.pdf" 
                  type="application/pdf" width="100%" height="600px" /> 
                         {/* <iframe src="../resources/ukgbook.pdf" 
                        >UKG    </iframe> */}
                    </div>
                </div> 
                {/* <object
                        data="https://example.com/test.pdf#page=2"
                        type="application/pdf"
                        width="100%"
                        height="100%">
                        <iframe
                            src="https://example.com/test.pdf#page=2"
                            width="100%"
                            height="100%"
                            style="border: none;">
                            <p>Your browser does not support PDFs.
                            <a href="https://example.com/test.pdf">Download the PDF</a>.</p>
                        </iframe>
                        </object>        */}
                        <Document  
                            file ="../resources/ukgbook.pdf"
                            onLoadSuccess = {this.onDocumentLoadSuccess}>
                            <Page pageNumber={pageNumber} />
                        </Document>
                        <p>Page {pageNumber}  of {numPages}</p>
            </div>
        </div>); //end return function
    } // End Render function
} // End class Booklist
         
export default Booklist;
