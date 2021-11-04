import React, { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import _ from 'lodash';
import UseScript from "../../components/common/useScript";

toast.configure({ bodyClassName: "customFont rtl" });

const UserProfile = (props) => {
    UseScript('../../assets/javascript/custom.js');
    return (
        <div className="mainpelak row">
            <div className="innerpelak col-12">
                <div>
                    <input type="text" className="form-control pelakinputitem" />
                </div>
                <div>
                    <input type="text" className="form-control pelakinputitem" />
                </div>
                <div>
                    <input type="text" className="form-control pelakinputitem" />
                </div>
                <div >
                    <input type="text" className="form-control pelakinputitem" />
                </div>
                <div>
                    <input type="text" className="form-control pelakinputitem" />
                </div>
                <div>
                    <select className="form-control pelakinputitem">
                        <option value="0"> الف</option>
                        <option value="1"> ب</option>
                        <option value="2"> پ</option>
                        <option value="3"> ت</option>
                        <option value="4"> ث</option>
                        <option value="5"> ج</option>
                        <option value="6"> �</option>
                        <option value="7"> ح</option>
                        <option value="8"> خ</option>
                        <option value="9"> د</option>
                        <option value="10"> ذ</option>
                        <option value="11"> ر</option>
                        <option value="12"> ز</option>
                        <option value="13"> س</option>
                        <option value="14"> ش</option>
                        <option value="15"> ص</option>
                        <option value="16"> ض</option>
                        <option value="17"> ط</option>
                        <option value="18"> ظ</option>
                        <option value="19"> ع</option>
                        <option value="20"> غ</option>
                        <option value="21"> ف</option>
                        <option value="22"> ق</option>
                        <option value="23"> ک</option>
                        <option value="24"> گ</option>
                        <option value="25"> ل</option>
                        <option value="26"> م</option>
                        <option value="27"> ن</option>
                        <option value="28"> و</option>
                        <option value="29"> هـ</option>
                        <option value="30"> ی</option>
                        <option value="31"> D</option>
                        <option value="32"> S</option>
                    </select>
                </div>
                <div>
                    <input type="text" className="form-control pelakinputitem" />
                </div>
                <div>
                    <input type="text" className="form-control pelakinputitem" />
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
