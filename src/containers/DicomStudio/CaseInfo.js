import React, { useState } from 'react';
import { Button, Dropdown, Accordion, Icon } from 'semantic-ui-react';

const styles = {
    panel: {
        width: '300px',
        backgroundColor: '#81B19C',
        color: 'white',
        padding: '10px 10px 10px 10px',
        borderRadius: '5px',
        boxShadow: '4px 3px #535052',
        textAlign: 'left',
    },
    accordionTitle: {
        textAlign: 'left',
    },
    accordionDescription: {
        color: 'black',
    },
    sectionTitle: {
        fontSize: '12pt',
        fontWeight: '600',
    },
};

export default function CaseInfo({
    actions,
    caseCodes,
    mriPasses,
    clinicalData,
    classificationResult,
    activeIndex,
    setActiveIndex,
    disabledMriPassReference,
    disabledSubmit,
    disableCaseSelector,
}) {
    const parseOptions = (list) => list.map((c, i) => ({ key: i, text: c.split('/')[0], value: c }));

    const onAccordionClick = (e, titleProps) => {
        const { index } = titleProps;
        const newIndex = activeIndex === index ? -1 : index;
        setActiveIndex(newIndex);
    };

    return (
        <div style={styles.panel}>
            <div>
                <span style={styles.sectionTitle}>Case identifier</span>
                <Dropdown
                    title='Select a case code'
                    placeholder='Select a case code'
                    fluid
                    selection
                    options={parseOptions(caseCodes)}
                    onChange={actions.onCaseCodeDropDownChange}
                    disabled={disableCaseSelector}
                />
            </div>
            <div className='cui pt-12'>
                <span style={styles.sectionTitle}>MRI pass reference</span>
                <Dropdown
                    title='Select a MRI pass'
                    placeholder='Select a MRI pass'
                    fluid
                    selection
                    options={parseOptions(mriPasses)}
                    onChange={actions.onMriPassNumDropDownChange}
                    disabled={disabledMriPassReference}
                />
            </div>
            <Button.Group fluid className='cui pt-6 mt-10'>
                <Button onClick={actions.submitSelection} title='Submit selection' disabled={disabledSubmit}>
                    Submit selection
                </Button>
            </Button.Group>

            <div className='cui pt-6  mt-10'>
                <Accordion fluid styled>
                    {disabledMriPassReference ? (
                        ''
                    ) : (
                        <div>
                            <Accordion.Title active={activeIndex === 0} index={0} onClick={onAccordionClick} style={styles.accordionTitle}>
                                <Icon name='dropdown' />
                                Clinical data
                            </Accordion.Title>
                            <Accordion.Content active={activeIndex === 0}>
                                <p style={styles.accordionDescription}>{clinicalData ?? 'No clinical data available.'}</p>
                            </Accordion.Content>
                        </div>
                    )}
                    {!classificationResult ? (
                        ''
                    ) : (
                        <Accordion.Title active={activeIndex === 1} index={1} onClick={onAccordionClick} style={styles.accordionTitle}>
                            <Icon name='dropdown' />
                            Classification Result
                        </Accordion.Title>
                    )}
                    {!classificationResult ? (
                        ''
                    ) : (
                        <Accordion.Content active={activeIndex === 1}>
                            <p style={styles.accordionDescription}>{classificationResult}</p>
                        </Accordion.Content>
                    )}
                </Accordion>
            </div>
        </div>
    );
}
