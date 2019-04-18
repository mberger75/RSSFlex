import React from 'react';

export const tabList = [
    {emoji: '🎨', title: 'FRONTEND', state: 'active'},
    {emoji: '🌈', title: 'UI/UX'},
    {emoji: '🎩', title: 'BACKEND'},
    {emoji: '📱', title: 'MOBILE'},
    {emoji: '💾', title: 'HARDWARE'},
]

const Tab = ({state, id, emoji, title, toggle, switchPan}) => (
    <button className={'btn ' + state} onClick={function() {toggle(id); switchPan(title)}}>
        <span role='img' aria-label='emoji'>{emoji}</span> 
        &nbsp;{title}
    </button>
)

export default Tab;