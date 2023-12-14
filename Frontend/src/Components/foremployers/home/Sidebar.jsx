import React from 'react'
import { BsHouseDoor, BsFillGrid3X3GapFill, BsListCheck, BsFillGearFill} from 'react-icons/bs';
import { RiUserSearchLine } from "react-icons/ri";
import { FaAngellist } from "react-icons/fa";
import { AiOutlineMessage } from "react-icons/ai";
import { Link } from 'react-router-dom';

function Sidebar({openSidebarToggle, OpenSidebar}) {
  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive": "sidebar"}>
        <div className='sidebar-title'>
            <div className='sidebar-brand'>
                 Duniya Job
            </div>
            <span className='icon close_icon' onClick={OpenSidebar}>X</span>
        </div>

        <ul className='sidebar-list'>
            <li className='sidebar-list-item'>
                <Link to="/company-home">
                    <BsHouseDoor className='icon'/> Home
                </Link>
            </li>
            <li className='sidebar-list-item'>
                <Link to="">
                    <RiUserSearchLine className='icon'/> Search Candidates
                </Link>
            </li>
            <li className='sidebar-list-item'>
                <Link to="/job-postings">
                    <BsFillGrid3X3GapFill className='icon'/> Job Posting
                </Link>
            </li>
            <li className='sidebar-list-item'>
                <Link to="">
                    <FaAngellist className='icon'/> Shortlist
                </Link>
            </li>
            <li className='sidebar-list-item'>
                <Link to="">
                    <BsListCheck className='icon'/> Interview
                </Link>
            </li>
            <li className='sidebar-list-item'>
                <Link to="">
                    <AiOutlineMessage className='icon'/> Message
                </Link>
            </li>
            <li className='sidebar-list-item'>
                <Link to="">
                    <BsFillGearFill className='icon'/> Settings
                </Link>
            </li>
        </ul>
    </aside>
  )
}

export default Sidebar