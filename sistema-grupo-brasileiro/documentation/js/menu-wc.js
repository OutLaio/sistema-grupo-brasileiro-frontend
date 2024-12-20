'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">sistema-grupo-brasileiro documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-AppModule-1258e1e22ece286c0472b5a3888cb35cec747725942f5ef687ccad03045594790faf8dcc40991d83a9b9e7623925f482531d1c41ddf64a0aa5cb94d09dc9ea89"' : 'data-bs-target="#xs-components-links-module-AppModule-1258e1e22ece286c0472b5a3888cb35cec747725942f5ef687ccad03045594790faf8dcc40991d83a9b9e7623925f482531d1c41ddf64a0aa5cb94d09dc9ea89"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-1258e1e22ece286c0472b5a3888cb35cec747725942f5ef687ccad03045594790faf8dcc40991d83a9b9e7623925f482531d1c41ddf64a0aa5cb94d09dc9ea89"' :
                                            'id="xs-components-links-module-AppModule-1258e1e22ece286c0472b5a3888cb35cec747725942f5ef687ccad03045594790faf8dcc40991d83a9b9e7623925f482531d1c41ddf64a0aa5cb94d09dc9ea89"' }>
                                            <li class="link">
                                                <a href="components/AgencyBoardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AgencyBoardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AgencyBoardRequestComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AgencyBoardRequestComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BtnFinalizeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BtnFinalizeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CheckRequestsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CheckRequestsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CollaboratorSystemComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CollaboratorSystemComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DialogBoxComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DialogBoxComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditUserDataComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >EditUserDataComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HeaderComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HeaderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ListClientsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ListClientsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ListCollaboratorsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ListCollaboratorsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoadingFileComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoadingFileComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoginComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoginComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MainCreateRequestComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MainCreateRequestComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MainProfileComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MainProfileComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RecoveryPasswordComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RecoveryPasswordComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RegisterCollaboratorComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RegisterCollaboratorComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RegisterComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RegisterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RequestDetailsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RequestDetailsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ResetPasswordComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ResetPasswordComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SidebarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SidebarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SignpostComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SignpostComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SignpostRequestComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SignpostRequestComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/StickerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StickerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/StickersRequestComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StickersRequestComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserDataComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserDataComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/VersionComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >VersionComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#directives-links-module-AppModule-1258e1e22ece286c0472b5a3888cb35cec747725942f5ef687ccad03045594790faf8dcc40991d83a9b9e7623925f482531d1c41ddf64a0aa5cb94d09dc9ea89"' : 'data-bs-target="#xs-directives-links-module-AppModule-1258e1e22ece286c0472b5a3888cb35cec747725942f5ef687ccad03045594790faf8dcc40991d83a9b9e7623925f482531d1c41ddf64a0aa5cb94d09dc9ea89"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-AppModule-1258e1e22ece286c0472b5a3888cb35cec747725942f5ef687ccad03045594790faf8dcc40991d83a9b9e7623925f482531d1c41ddf64a0aa5cb94d09dc9ea89"' :
                                        'id="xs-directives-links-module-AppModule-1258e1e22ece286c0472b5a3888cb35cec747725942f5ef687ccad03045594790faf8dcc40991d83a9b9e7623925f482531d1c41ddf64a0aa5cb94d09dc9ea89"' }>
                                        <li class="link">
                                            <a href="directives/CapitalizeDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CapitalizeDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/ColorClassDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ColorClassDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/DndDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DndDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/PhoneMaskDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PhoneMaskDirective</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/MainCreateRequestRoutingModule.html" data-type="entity-link" >MainCreateRequestRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ProfileRoutingModule.html" data-type="entity-link" >ProfileRoutingModule</a>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/CheckRequestsService.html" data-type="entity-link" >CheckRequestsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CitiesCompaniesService.html" data-type="entity-link" >CitiesCompaniesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CreateRequestService.html" data-type="entity-link" >CreateRequestService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DataService.html" data-type="entity-link" >DataService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ListClientsService.html" data-type="entity-link" >ListClientsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ListCollaboratorsService.html" data-type="entity-link" >ListCollaboratorsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LoginRegisterService.html" data-type="entity-link" >LoginRegisterService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ProfileService.html" data-type="entity-link" >ProfileService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RequestDetailsService.html" data-type="entity-link" >RequestDetailsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SidebarService.html" data-type="entity-link" >SidebarService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/StorageService.html" data-type="entity-link" >StorageService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UtilsService.html" data-type="entity-link" >UtilsService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#guards-links"' :
                            'data-bs-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AuthGuard.html" data-type="entity-link" >AuthGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/CardsAttributes.html" data-type="entity-link" >CardsAttributes</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CompanyDetails.html" data-type="entity-link" >CompanyDetails</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/I_Agency_Board_Data.html" data-type="entity-link" >I_Agency_Board_Data</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/I_Agency_Board_Data-1.html" data-type="entity-link" >I_Agency_Board_Data</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/I_Agency_Board_Others_Routes.html" data-type="entity-link" >I_Agency_Board_Others_Routes</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/I_Agency_Board_Request.html" data-type="entity-link" >I_Agency_Board_Request</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/I_Agency_Board_Response.html" data-type="entity-link" >I_Agency_Board_Response</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/I_Agency_Board_Routes.html" data-type="entity-link" >I_Agency_Board_Routes</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/I_Agency_Board_Type_Data.html" data-type="entity-link" >I_Agency_Board_Type_Data</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/I_Alter_Date_Request.html" data-type="entity-link" >I_Alter_Date_Request</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/I_Alter_Status_Request.html" data-type="entity-link" >I_Alter_Status_Request</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/I_Alter_Title_Request.html" data-type="entity-link" >I_Alter_Title_Request</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/I_Any_Briefing.html" data-type="entity-link" >I_Any_Briefing</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/I_Api_Response.html" data-type="entity-link" >I_Api_Response</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/I_Approve_Request.html" data-type="entity-link" >I_Approve_Request</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/I_Assign_Collaborator_Request.html" data-type="entity-link" >I_Assign_Collaborator_Request</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/I_Board_Type_Data.html" data-type="entity-link" >I_Board_Type_Data</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/I_Briefing_Data.html" data-type="entity-link" >I_Briefing_Data</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/I_Briefing_Request.html" data-type="entity-link" >I_Briefing_Request</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/I_Briefing_Type_Data.html" data-type="entity-link" >I_Briefing_Type_Data</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/I_Change_Password_Request.html" data-type="entity-link" >I_Change_Password_Request</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/I_City_Data.html" data-type="entity-link" >I_City_Data</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/I_Company_Briefing_Form_Data.html" data-type="entity-link" >I_Company_Briefing_Form_Data</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/I_Company_Briefing_View_Data.html" data-type="entity-link" >I_Company_Briefing_View_Data</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/I_Company_Data.html" data-type="entity-link" >I_Company_Data</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/I_Dialog_Box_Request.html" data-type="entity-link" >I_Dialog_Box_Request</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/I_Dialog_Box_Response.html" data-type="entity-link" >I_Dialog_Box_Response</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/I_Employee_Form_Data.html" data-type="entity-link" >I_Employee_Form_Data</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/I_Employee_Simple_View_Data.html" data-type="entity-link" >I_Employee_Simple_View_Data</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/I_Employee_View_Data.html" data-type="entity-link" >I_Employee_View_Data</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/I_Login_Request.html" data-type="entity-link" >I_Login_Request</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/I_Material_Data.html" data-type="entity-link" >I_Material_Data</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/I_Material_Data-1.html" data-type="entity-link" >I_Material_Data</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/I_Measurements_Data.html" data-type="entity-link" >I_Measurements_Data</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/I_New_Version_Request.html" data-type="entity-link" >I_New_Version_Request</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/I_Other_Route_Data.html" data-type="entity-link" >I_Other_Route_Data</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/I_Page.html" data-type="entity-link" >I_Page</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/I_Profile_View_Data.html" data-type="entity-link" >I_Profile_View_Data</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/I_Project_Data.html" data-type="entity-link" >I_Project_Data</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/I_Project_Request.html" data-type="entity-link" >I_Project_Request</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/I_Recovery_Password_Request.html" data-type="entity-link" >I_Recovery_Password_Request</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/I_Reset_Password_Request.html" data-type="entity-link" >I_Reset_Password_Request</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/I_Route_Data.html" data-type="entity-link" >I_Route_Data</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/I_Signpost_Form_Data.html" data-type="entity-link" >I_Signpost_Form_Data</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/I_Signpost_Request.html" data-type="entity-link" >I_Signpost_Request</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/I_Signpost_Response.html" data-type="entity-link" >I_Signpost_Response</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/I_Signpost_Response-1.html" data-type="entity-link" >I_Signpost_Response</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/I_Signpost_View_Data.html" data-type="entity-link" >I_Signpost_View_Data</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/I_Sticker_Data.html" data-type="entity-link" >I_Sticker_Data</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/I_Sticker_Form_Data.html" data-type="entity-link" >I_Sticker_Form_Data</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/I_Sticker_Information_Type_Data.html" data-type="entity-link" >I_Sticker_Information_Type_Data</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/I_Sticker_Request.html" data-type="entity-link" >I_Sticker_Request</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/I_Sticker_Response.html" data-type="entity-link" >I_Sticker_Response</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/I_Sticker_Type_Data.html" data-type="entity-link" >I_Sticker_Type_Data</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/I_Stickers_Form_Data.html" data-type="entity-link" >I_Stickers_Form_Data</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/I_Stickers_Request.html" data-type="entity-link" >I_Stickers_Request</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/I_Stickers_View_Data.html" data-type="entity-link" >I_Stickers_View_Data</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/I_Token_Response.html" data-type="entity-link" >I_Token_Response</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/I_Upload_Response.html" data-type="entity-link" >I_Upload_Response</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/I_User_Form_Data.html" data-type="entity-link" >I_User_Form_Data</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/I_User_Request.html" data-type="entity-link" >I_User_Request</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/I_User_Response.html" data-type="entity-link" >I_User_Response</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/I_User_View_Data.html" data-type="entity-link" >I_User_View_Data</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/I_Version_Data.html" data-type="entity-link" >I_Version_Data</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});