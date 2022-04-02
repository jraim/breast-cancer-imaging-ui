import React, { Component } from 'react';

export default class AboutDataset extends Component {
    render() {
        return (
            <div className={`cui width-${this.props.width}vw flex column ai-start`}>
                <div className='cui flex row'>
                    <p className='cui m-0 pr-6'>DICOM image dataset: </p>
                    <a href='https://sites.duke.edu/mazurowski/resources/breast-cancer-mri-dataset/'> Duke Breast Cancer MRI</a>
                </div>
                <p className={`cui width-${this.props.width}vw font${this.props.fontSize} text-align-justify `}>
                    Saha, A., Harowicz, M.R., Grimm, L.J., Kim, C.E., Ghate, S.V., Walsh, R. and Mazurowski, M.A., 2018. A machine learning approach
                    to radiogenomics of breast cancer: a study of 922 subjects and 529 DCE-MRI features. British journal of cancer, 119(4),
                    pp.508-516. A free version of this paper is available here: https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6134102/
                </p>
            </div>
        );
    }
}
