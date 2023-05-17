import { useState } from 'react';
import { CreatePage, JoinPage } from '../pages';
import './AuthLayout.css'

// eslint-disable-next-line react/prop-types
export const AuthLayout = ({ onCreateOrJoin }) => {

    const [ activeTab, setActiveTab ] = useState('join');

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className="container">
            <div className="d-flex justify-content-center align-items-center mt-5">
                <div className="card">
                    <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                        <li className="nav-item text-center">
                            <a
                                className={ `nav-link ${ activeTab === 'join' ? 'active' : '' }` }
                                id="pills-join-tab"
                                onClick={ () => handleTabChange('join') }
                            >
                                Join
                            </a>
                        </li>
                        <li className="nav-item text-center">
                            <a
                                className={ `nav-link ${ activeTab === 'create' ? 'active' : '' }` }
                                id="pills-create-tab"
                                onClick={ () => handleTabChange('create') }
                            >
                                Create
                            </a>
                        </li>
                    </ul>
                    <div className="tab-content" id="pills-tabContent">
                        <div className={ `tab-pane fade ${ activeTab === 'join' ? 'show active' : '' }` }
                             id="pills-join" role="tabpanel">
                            <JoinPage onCreateOrJoin={onCreateOrJoin}/>
                        </div>
                        <div className={ `tab-pane fade ${ activeTab === 'create' ? 'show active' : '' }` }
                             id="pills-create" role="tabpanel">
                            <CreatePage onCreateOrJoin={onCreateOrJoin}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};