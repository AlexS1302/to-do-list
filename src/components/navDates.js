
export function handleNavClicks() {
    document.querySelector("ul").addEventListener("click", (event) => {
        const clickedText = event.target.textContent;

        switch (clickedText) {
            case "All":
                console.log("All tasks selected");
                break;
            case "Today":
                console.log("Today's tasks selected");
                break;
        case "This Week":
                console.log("This week's tasks selected");
                break;
            case "This Month":
                console.log("This month's tasks selected");
                break;
            case "Overdue":
                console.log("Overdue tasks selected");
                break;
            case "Completed":
                console.log("Completed tasks selected");
                break;
            default:
                console.log("Unknown action");
                break;
        }
    });
}
    

