import React from 'react';

export const tabList = [
    {emoji: '🎨', title: 'FRONT', state: 'active'},
    {emoji: '🌈', title: 'UI/UX'},
    {emoji: '🎩', title: 'BACK'},
    {emoji: '📱', title: 'MOBILE'},
    {emoji: '🔌', title: 'HARDWARE'},
    {emoji: '📹', title: 'VIDEOS'}
]

const Tab = ({state, id, emoji, title, toggle, switchPan}) => (
    <button className={'btn ' + state} onClick={function() {toggle(id); switchPan(title)}}>
        <span role='img' aria-label='emoji'>{emoji}</span> 
        &nbsp;{title}
    </button>
)

export default Tab;