import React, {Component} from 'react';
import {withRouter} from 'react-router';
import PropTypes from 'prop-types';
import {Meteor} from 'meteor/meteor';
import {
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Button,
    FormGroup,
    Label,
    Input,
    ListGroup,
    ListGroupItem,
    Badge,
    InputGroup,
    InputGroupAddon,
    ButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import {Link} from 'react-router-dom';
import {Bert} from 'meteor/themeteorchef:bert';

import {T, t} from '/imports/common/Translation';
import {AppListStrings} from '/imports/common/AppListStrings';
import {SelectHelper, Select2Helper} from '../../helpers/inputs/SelectHelper';
import {DateInput} from '../../helpers/inputs/DateHelper';
import {ImageTag} from '../../helpers/tags/MediaImage';
import TextEditor from '../../helpers/inputs/TextEditor';
import {utilsHelper} from '../../helpers/utils/utils';

class FormActivity extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activity: {
                invites: {}
            },
            inviting: '',
            conferencing: false,
            notification: false
        };

        this.loadInviteUsers = this.loadInviteUsers.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        const activity = utilsHelper.inputChange(event, this.state.activity);
        this.setState({activity: activity});
    }

    getInputValue(name) {
        return (this.state.activity[name] ? this.state.activity[name] : '');
    }

    loadInviteUsers(input, callback) {
        Meteor.call('users.searchKeyword', input, 5, (error, response) => {
            let options = [];
            if (!error) {
                for (let idx in response) {
                    let user = response[idx];
                    options.push({
                        value: user._id,
                        label: user.username,
                        media: user.profile && user.profile.avatar ? user.profile.avatar : '',
                        user: user
                    });
                }
            }
            callback(null, {
                options: options
            });
        });
    }

    inviteUser(event) {
        let activity = this.state.activity;
        let invites = activity.invites;
        let user = event.selectedOption.user;
        invites[event.selectedOption.value] = {
            userId: event.selectedOption.value,
            username: event.selectedOption.label,
            userEmail: user.emails && user.emails[0].address,
            media: user.profile && user.profile.avatar ? user.profile.avatar : ''
        };
        activity.invites = invites;
        this.setState({
            inviting: event.selectedOption.value,
            activity: activity
        });
    }

    removeInviteUser(userId) {
        let invites = this.state.invites;
        if (invites[userId]) {
            delete invites[userId];
        }
        this.setState({
            inviting: '',
            invites: invites
        });
    }

    renderInviteUsers() {
        let indents = [];
        for (let userId in this.state.activity.invites) {
            let invite = this.state.activity.invites[userId];
            indents.push((
                <ListGroupItem key={userId} className="justify-content-between inviteUser">
                    <ImageTag media={invite.media ? invite.media : ''} style={{width: 24, height: 24}}/> {invite.username}
                    <Badge href="javascript:void(0)" className="pull-right" color="default"
                           onClick={this.removeInviteUser.bind(this, userId)}>
                        <i className="fa fa-remove"/>
                    </Badge>
                    <div className="inviteOption">
                        <FormGroup check>
                            <Input className="form-check-input" type="checkbox" checked={this.state.activity.invites[userId].canEdit || false}
                                   id={'canEdit' + userId} name={'invites.' + userId + '.canEdit'} onChange={this.handleInputChange}/>
                            <Label className="form-check-label" htmlFor={'canEdit.' + userId}><T>Can edit event</T></Label>
                        </FormGroup>
                        <FormGroup check>
                            <Input className="form-check-input" type="checkbox" checked={this.state.activity.invites[userId].canInvite || false}
                                   id={'canInvite' + userId} name={'invites.' + userId + '.canInvite'} onChange={this.handleInputChange}/>
                            <Label className="form-check-label" htmlFor={'canInvite.' + userId}><T>Can invite more users</T></Label>
                        </FormGroup>
                        <FormGroup check>
                            <Input className="form-check-input" type="checkbox" checked={this.state.activity.invites[userId].canSeeAll || false}
                                   id={'canSeeAll' + userId} name={'invites.' + userId + '.canSeeAll'} onChange={this.handleInputChange}/>
                            <Label className="form-check-label" htmlFor={'canSeeAll.' + userId}><T>Can see all invite users</T></Label>
                        </FormGroup>
                    </div>
                </ListGroupItem>
            ))
        }
        return indents;
    }

    handleSubmit() {

    }

    render() {
        const existing = this.props.activity && this.props.activity._id;

        return (
            <Card>
                <CardHeader>
                    <i className="fa fa-tasks"/>
                    <strong>{this.props.title}</strong>&nbsp;
                    {this.props.slogan}
                </CardHeader>
                <CardBody>
                    <Row>
                        <Col xs="12" md="6">
                            <FormGroup>
                                <Label><T>Subject</T></Label>
                                <Input type="text" name="name" placeholder={t.__('Enter here')}
                                       value={this.getInputValue('name')}
                                       onChange={this.handleInputChange}/>
                            </FormGroup>
                        </Col>
                        <Col xs="12" md="6">
                            <FormGroup>
                                <Label><T>Type</T></Label>
                                <SelectHelper name="type" placeholder={t.__('Choose...')} options={AppListStrings.ActivityTypes}
                                       value={this.getInputValue('type')}
                                       onChange={this.handleInputChange}/>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="12" md="6">
                            <FormGroup>
                                <Label><T>Date start</T></Label>
                                <DateInput type="datetime" name="dateStart"
                                           value={this.getInputValue('dateStart')}
                                           onChange={this.handleInputChange}/>
                            </FormGroup>
                        </Col>
                        <Col xs="12" md="6">
                            <FormGroup>
                                <Label><T>Date end</T></Label>
                                <DateInput type="datetime" name="dateEnd"
                                           value={this.getInputValue('dateEnd')}
                                           onChange={this.handleInputChange}/>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs="12" md="8">
                            <FormGroup>
                                <Label><T>Location</T></Label>
                                <Input type="text" name="location" placeholder={t.__('Enter here')}
                                       value={this.getInputValue('location')}
                                       onChange={this.handleInputChange}/>
                            </FormGroup>
                            <FormGroup>
                                <Label><T>Conferencing</T></Label>
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                        <ButtonDropdown isOpen={this.state.conferencing}
                                                        toggle={() => {
                                                            this.setState({conferencing: !this.state.conferencing});
                                                        }}>
                                            <DropdownToggle caret color="gray-200"><T>Add Conferencing</T></DropdownToggle>
                                            <DropdownMenu className={this.state.conferencing ? "show" : ""}>
                                                <DropdownItem>Action</DropdownItem>
                                                <DropdownItem>Another Action</DropdownItem>
                                                <DropdownItem>Something else here</DropdownItem>
                                                <DropdownItem>Separated link</DropdownItem>
                                            </DropdownMenu>
                                        </ButtonDropdown>
                                    </InputGroupAddon>
                                    <Input type="text" name="conferencing" placeholder="Conferencing"/>
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <Label><T>Notifications</T></Label>
                                <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                        <ButtonDropdown isOpen={this.state.notification}
                                                        toggle={() => {
                                                            this.setState({notification: !this.state.notification});
                                                        }}>
                                            <DropdownToggle caret color="gray-200"><T>Add Notification</T></DropdownToggle>
                                            <DropdownMenu className={this.state.conferencing ? "show" : ""}>
                                                <DropdownItem>Action</DropdownItem>
                                                <DropdownItem>Another Action</DropdownItem>
                                                <DropdownItem>Something else here</DropdownItem>
                                                <DropdownItem>Separated link</DropdownItem>
                                            </DropdownMenu>
                                        </ButtonDropdown>
                                    </InputGroupAddon>
                                    <Input type="text" name="notification" placeholder="Notifications"/>
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <Label><T>Description</T></Label>
                                <TextEditor/>
                            </FormGroup>
                        </Col>
                        <Col xs="12" md="4">
                            <FormGroup>
                                <Label><T>Invites</T></Label>
                                <Select2Helper name="invites" placeholder={t.__('Choose...')} value={this.state.inviting}
                                               async={true} loadOptions={this.loadInviteUsers} imgOption={true}
                                               onChange={this.inviteUser.bind(this)}/>
                            </FormGroup>
                            <ListGroup className="inviteUsers">
                                {this.renderInviteUsers()}
                            </ListGroup>
                        </Col>
                    </Row>
                </CardBody>
                <CardFooter>
                    <Button type="button" size="sm" color="primary" onClick={this.handleSubmit.bind(this)}>
                        <i className="fa fa-dot-circle-o"></i>&nbsp;
                        {existing ? <T>Update</T> :<T>Create</T>}
                    </Button>
                    <Button type="reset" size="sm" color="danger" onClick={() => this.props.history.push('/manager/activities')}>
                        <i className="fa fa-ban"></i> <T>Cancel</T>
                    </Button>
                </CardFooter>
            </Card>
        );
    }
}

FormActivity.defaultProps = {
    title: '',
    slogan: '',
    activity: {}
};

FormActivity.propTypes = {
    title: PropTypes.string,
    slogan: PropTypes.string,
    activity: PropTypes.object
};

export default withRouter(FormActivity);
