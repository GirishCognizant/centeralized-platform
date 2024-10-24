import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { RxCross2 } from "react-icons/rx";
import { IoMdArrowDropright, IoMdArrowDropdown } from "react-icons/io";
import { Tooltip } from 'react-tooltip'

export default function SideBar({ isOpen, onClose, sidebarRef }) {
    const location = useLocation();

    // formula page
    const [isFormulaOpen, setIsFormulaOpen] = useState(false);
    const isFormulaActive = location.pathname === '/Fcl' || location.pathname === '/Residual';
    const toggleFormulaMenu = () => {
        setIsFormulaOpen(!isFormulaOpen);
    };

    //Tolerance rules
    const [isTolerance, setIsTolerance] = useState(false);
    const isToleranceActive = location.pathname === '/MaintenanceOverAdvance' || location.pathname === '/GAPIsNotPermitted' || location.pathname === '/ServiceContractOverAdvance';
    const toggleToleranceMenu = () => {
        setIsTolerance(!isTolerance);
    };
    
    return (
        <div ref={sidebarRef} className={`fixed inset-0 z-40 bg-gray-200 text-black max-w-48 transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <div className="w-full h-full overflow-y-auto">
                <div className='text-3xl p-4 px-8 w-full text-blue-700'>
                    <RxCross2 className='cursor-pointer' onClick={onClose} />
                </div>
                <ul className="mt-5 space-y-2 pl-5 ">
                    <li><NavLink to="/VinGenerator" className={({ isActive }) => ` block text-black  p-2  font-bold hover:underline hover:underline-offset-8 ${isActive ? " text-blue-700 underline underline-offset-8 " : " text-black "}`}>VIN Generator</NavLink></li>
                    <li><NavLink to="/Dealer" className={({ isActive }) => ` block text-black  p-2  font-bold hover:underline hover:underline-offset-8 ${isActive ? " text-blue-700 underline underline-offset-8 " : " text-black "}`}>Dealer Details</NavLink></li>
                    <li><NavLink to="/Origenate" className={({ isActive }) => ` block text-black  p-2  font-bold hover:underline hover:underline-offset-8 ${isActive ? " text-blue-700 underline underline-offset-8 " : " text-black "}`}>Origenate Details</NavLink></li>
                    <li><NavLink to="/AutoApproval" className={({ isActive }) => ` block text-black  p-2  font-bold hover:underline hover:underline-offset-8 ${isActive ? " text-blue-700 underline underline-offset-8 " : " text-black "}`}>Auto Approval</NavLink></li>
                    <li><NavLink to="/CustomerProfile" className={({ isActive }) => ` block text-black  p-2  font-bold hover:underline hover:underline-offset-8 ${isActive ? " text-blue-700 underline underline-offset-8 " : " text-black "}`}>Customer Profile</NavLink></li>
                    <li><NavLink to="#" onClick={toggleFormulaMenu} className={`block  p-2 font-bold hover:underline hover:underline-offset-8 ${isFormulaActive ? "text-blue-700 underline underline-offset-8" : "text-black"}`}>Formula{isFormulaOpen ? <IoMdArrowDropdown className='inline-block' /> : <IoMdArrowDropright className='inline-block' />}</NavLink>
                        {isFormulaOpen && (
                            <ul className="mt-2">
                                <li><NavLink to="/Fcl" className={({ isActive }) => `block text-black p-2 font-bold text-sm hover:underline hover:underline-offset-8 ${isActive ? " text-blue-700 underline underline-offset-8" : "text-black"}`}>FCL</NavLink></li>
                                <li><NavLink to="/Residual" className={({ isActive }) => `block text-black p-2 font-bold text-sm hover:underline hover:underline-offset-8 ${isActive ? " text-blue-700 underline underline-offset-8" : "text-black"}`}>Residual</NavLink></li>
                            </ul>
                        )}
                    </li>
                    <li><NavLink to="/DecisionRules" className={({ isActive }) => ` block text-black  p-2  font-bold hover:underline hover:underline-offset-8 ${isActive ? " text-blue-700 underline underline-offset-8 " : " text-black "}`}>DecisionRules</NavLink></li>
                    <li><NavLink to="#" onClick={toggleToleranceMenu} className={`block  p-2 font-bold hover:underline hover:underline-offset-8 ${isToleranceActive ? "text-blue-700 underline underline-offset-8" : "text-black"}`}>Tolerance{isTolerance ? <IoMdArrowDropdown className='inline-block' /> : <IoMdArrowDropright className='inline-block' />}</NavLink>
                        {isTolerance && (
                            <ul className="mt-2">
                                <Tooltip id="MaintenanceOverAdvance"  />
                                <li><NavLink data-tooltip-id="MaintenanceOverAdvance" data-tooltip-content="Maintenance Over Advance" to="/MaintenanceOverAdvance" className={({ isActive }) => `block text-black  p-2 font-bold text-sm hover:underline hover:underline-offset-8 ${isActive ? " text-blue-700 underline underline-offset-8" : "text-black"}`}>MOA</NavLink></li>
                                <Tooltip id="GAPIsNotPermitted"  />
                                <li><NavLink data-tooltip-id="GAPIsNotPermitted" data-tooltip-content="GAP Is Not Permitted" to="/GAPIsNotPermitted" className={({ isActive }) => `block text-black  p-2 font-bold text-sm hover:underline hover:underline-offset-8 ${isActive ? " text-blue-700 underline underline-offset-8" : "text-black"}`}>GAP-INP</NavLink></li>
                                <Tooltip id="ServiceContractOverAdvance"  />
                                <li><NavLink data-tooltip-id="ServiceContractOverAdvance" data-tooltip-content="Service Contract Over Advance" to="/ServiceContractOverAdvance" className={({ isActive }) => `block text-black  p-2 font-bold text-sm hover:underline hover:underline-offset-8 ${isActive ? " text-blue-700 underline underline-offset-8" : "text-black"}`}>SCOA</NavLink></li>
                                <Tooltip id="GapAmountOverAdvance"  />
                                <li><NavLink data-tooltip-id="GapAmountOverAdvance" data-tooltip-content="Gap Amount Over Advance" to="/GapAmountOverAdvance" className={({ isActive }) => `block text-black  p-2 font-bold text-sm hover:underline hover:underline-offset-8 ${isActive ? " text-blue-700 underline underline-offset-8" : "text-black"}`}>GAOA</NavLink></li>
                                <Tooltip id="OtherAmountsOverAdvance"  />
                                <li><NavLink data-tooltip-id="OtherAmountsOverAdvance" data-tooltip-content="Other Amounts Over Advance" to="/OtherAmountsOverAdvance" className={({ isActive }) => `block text-black  p-2 font-bold text-sm hover:underline hover:underline-offset-8 ${isActive ? " text-blue-700 underline underline-offset-8" : "text-black"}`}>OAOA</NavLink></li>
                                <Tooltip id="Halo"  />
                                <li><NavLink data-tooltip-id="Halo" data-tooltip-content="Halo" to="/Halo" className={({ isActive }) => `block text-black  p-2 font-bold text-sm hover:underline hover:underline-offset-8 ${isActive ? " text-blue-700 underline underline-offset-8" : "text-black"}`}>Halo</NavLink></li>
                                <Tooltip id="TermProtection"  />
                                <li><NavLink data-tooltip-id="TermProtection" data-tooltip-content="TermProtection" to="/TermProtection" className={({ isActive }) => `block text-black  p-2 font-bold text-sm hover:underline hover:underline-offset-8 ${isActive ? " text-blue-700 underline underline-offset-8" : "text-black"}`}>TermProtection</NavLink></li>
                                <Tooltip id="TheftProtectionFeeExceedsLimit"  />
                                <li><NavLink data-tooltip-id="TheftProtectionFeeExceedsLimit" data-tooltip-content="Theft Protection FeeExceeds Limit" to="/TheftProtectionFeeExceedsLimit" className={({ isActive }) => `block text-black  p-2 font-bold text-sm hover:underline hover:underline-offset-8 ${isActive ? " text-blue-700 underline underline-offset-8" : "text-black"}`}>TPFEL</NavLink></li>
                                <Tooltip id="EVTaxCredit"  />
                                <li><NavLink data-tooltip-id="EVTaxCredit" data-tooltip-content="EV Tax Credit" to="/EVTaxCredit" className={({ isActive }) => `block text-black  p-2 font-bold text-sm hover:underline hover:underline-offset-8 ${isActive ? " text-blue-700 underline underline-offset-8" : "text-black"}`}>EV-TC</NavLink></li>
                                <Tooltip id="ModelIsNotEligibleForSentinel"  />
                                <li><NavLink data-tooltip-id="ModelIsNotEligibleForSentinel" data-tooltip-content="Model Is Not Eligible For Sentinel" to="/ModelIsNotEligibleForSentinel" className={({ isActive }) => `block text-black  p-2 font-bold text-sm hover:underline hover:underline-offset-8 ${isActive ? " text-blue-700 underline underline-offset-8" : "text-black"}`}>MINEFS</NavLink></li>
                                <Tooltip id="TireAndWheelProtectionExceedsLimit"  />
                                <li><NavLink data-tooltip-id="TireAndWheelProtectionExceedsLimit" data-tooltip-content="Tire And Wheel Protection Exceeds Limit" to="/TireAndWheelProtectionExceedsLimit" className={({ isActive }) => `block text-black  p-2 font-bold text-sm hover:underline hover:underline-offset-8 ${isActive ? " text-blue-700 underline underline-offset-8" : "text-black"}`}>TAWPEL</NavLink></li>
                            </ul>
                        )}
                    </li>
                    <li><NavLink to="/Checklist" className={({ isActive }) => ` block text-black p-2  font-bold hover:underline hover:underline-offset-8 ${isActive ? " text-blue-700 underline underline-offset-8 " : " text-black "}`}>Checklist</NavLink></li>
                </ul>
            </div>
        </div>
    );
}