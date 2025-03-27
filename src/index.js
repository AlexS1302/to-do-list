import 'modern-normalize/modern-normalize.css';
import "./styles.css";
//import { format } from "date-fns";

import { displayTaskModal, displayProjectModal  } from './components/displayModal';
import { submitTaskHandler } from './components/submitTask';
import { handleButtonClicks } from './components/footerBtns';
import { handleNavClicks } from './components/navDates';

displayTaskModal();
displayProjectModal();
submitTaskHandler();
handleButtonClicks();
handleNavClicks();

