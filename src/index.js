import 'modern-normalize/modern-normalize.css';
import "./styles.css";
//import { format } from "date-fns";

import { displayModal } from './components/displayModal';
import { submitTaskHandler } from './components/submitTask';
import { handleDeleteBtnClick } from './components/footerBtns';

displayModal();
submitTaskHandler();
handleDeleteBtnClick();

