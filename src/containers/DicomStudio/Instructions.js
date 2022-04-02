import React from 'react';
import { List } from 'semantic-ui-react';

export default function Instructions() {
    return (
        <div className='cui flex column jc-center ai-center width-100'>
            <div className='cui width-60'>
                <h2 className='cui text-align-left text-color-blue'>Instructions</h2>
                <List divided relaxed className='cui text-align-left'>
                    <List.Item>
                        <List.Icon name='angle right' size='large' verticalAlign='middle' />
                        <List.Content>
                            <List.Header>Select a case</List.Header>
                            <List.Description>Use the drop down box to select a case.</List.Description>
                        </List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Icon name='angle right' size='large' verticalAlign='middle' />
                        <List.Content>
                            <List.Header>Select a MRI pass configuration</List.Header>
                            <List.Description>Use the drop down box to select a MRI pass configuration.</List.Description>
                        </List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Icon name='angle right' size='large' verticalAlign='middle' />
                        <List.Content>
                            <List.Header>Change slices.</List.Header>
                            <List.Description>Toggle between slices using the right and left arrows.</List.Description>
                        </List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Icon name='angle right' size='large' verticalAlign='middle' />
                        <List.Content>
                            <List.Header>Mark the lesion</List.Header>
                            <List.Description>
                                Use the ellipse shape to mark the lesion region. Leave some space between the lesion and the ellipse border.
                            </List.Description>
                        </List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Icon name='angle right' size='large' verticalAlign='middle' />
                        <List.Content>
                            <List.Header>Submit</List.Header>
                            <List.Description>Press the submit button in order the request the classification of the mark region.</List.Description>
                        </List.Content>
                    </List.Item>
                </List>
            </div>
        </div>
    );
}
