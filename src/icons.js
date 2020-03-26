import React from "react";
import {
    Add
} from "@material-ui/icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export const AddIcon = (props) => <Add {...props}/>;
export const EmojiFrownIcon = (props) => <FontAwesomeIcon icon={['far', 'frown']} {...props}/>;
export const EmojiMehIcon = (props) => <FontAwesomeIcon icon={['far', 'meh']} {...props}/>;
export const EmojiSmileIcon = (props) => <FontAwesomeIcon icon={['far', 'smile']} {...props}/>;
export const EmojiGrinIcon = (props) => <FontAwesomeIcon icon={['far', 'grin']} {...props}/>;
