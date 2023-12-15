import React from 'react'
import { BsHouseDoor, BsFillGrid3X3GapFill, BsListCheck, BsFillGearFill} from 'react-icons/bs';
import { RiUserSearchLine } from "react-icons/ri";
import { FaAngellist } from "react-icons/fa";
import { AiOutlineMessage } from "react-icons/ai";
import Home from './Home'
import JobPostings from "./JobPostings";
import SearchCandidates from './SearchCandidates';
import ShortList from './ShortList';
import Interview from './Interview';
import Message from './Message';
import Settings from './Settings';

function Sidebar({openSidebarToggle, OpenSidebar, handleLinkClick}) {
  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive": "sidebar"}>
        <div className='sidebar-title'>
            <div className='sidebar-brand'>
                 Duniya Job
            </div>
            <span className='icon close_icon' onClick={OpenSidebar}>X</span>
        </div>

        <ul className='sidebar-list'>
            <li className="sidebar-list-item" onClick={() => handleLinkClick(<Home />)}>
                <BsHouseDoor className="icon" /> Home
            </li>
            <li className="sidebar-list-item" onClick={() => handleLinkClick(<SearchCandidates />)}>
                <RiUserSearchLine className="icon" /> Search Candidates
            </li>
            <li className='sidebar-list-item' onClick={() => handleLinkClick(<JobPostings />)}>
                <BsFillGrid3X3GapFill className='icon'/> Job Posting
            </li>
            <li className='sidebar-list-item' onClick={() => handleLinkClick(<ShortList />)}>
                <FaAngellist className='icon'/> Shortlist
            </li>
            <li className='sidebar-list-item' onClick={() => handleLinkClick(<Interview />)}>
                <BsListCheck className='icon'/> Interview
            </li>
            <li className='sidebar-list-item' onClick={() => handleLinkClick(<Message />)}>
                <AiOutlineMessage className='icon'/> Message
            </li>
            <li className='sidebar-list-item' onClick={() => handleLinkClick(<Settings />)}>
                <BsFillGearFill className='icon'/> Settings
            </li>
        </ul>
    </aside>
  )
}

export default Sidebar