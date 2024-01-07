import React from 'react';
import {Badge,Tooltip,Whisper,IconButton} from 'rsuite';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHeart} from '@fortawesome/free-solid-svg-icons';
import CloseIcon from '@rsuite/icons/Close';

const ConditionalBadge = ({condition,children}) => {
    return condition ? <Badge content = {condition}>{children}</Badge> : children;
}
const IconBtnControl = ({isVisible,iconName,tooltip,onClick,badgeContent,...props}) => {
  return (
    <div className='ml-2' style={{visibility : isVisible ? 'visible' : 'hidden'}}>
       <ConditionalBadge condition={badgeContent}>
            <Whisper placement='top' delay={0} delayClose={0} delayOpen={0} trigger="hover" speaker={<Tooltip>{tooltip}</Tooltip>}>
                <IconButton {...props}  onClick={onClick} circle size='xs' icon={iconName == "heart" ? <FontAwesomeIcon icon={faHeart} /> : <CloseIcon/>}/>
            </Whisper>
       </ConditionalBadge>
    </div>
  )
}

export default IconBtnControl;
