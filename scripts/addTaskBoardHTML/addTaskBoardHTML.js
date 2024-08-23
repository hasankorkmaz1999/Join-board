function handleProgress0() {
    let button = document.getElementById('addTaskFlexButtons');
    button.innerHTML = `
            <button id="createbutton" type="button" onclick="addTaskBoard(0)" class="createbutton">
                <p class="create-mobile">Create Task</p>
                <img class="check-icon-mobile" src="./IMGicons/check.svg" alt="Icon check">
            </form>
    `;
}


function handleProgress1() {
    let title = document.getElementById('addTaskH1');
    let button = document.getElementById('addTaskFlexButtons');
    title.innerHTML = `Create Task in To-Do`;
    button.innerHTML = `
            <button id="createbutton" type="button" onclick="addTaskBoard(1)" class="createbutton">
                <p class="create-mobile">Create Task</p>
                <img class="check-icon-mobile" src="./IMGicons/check.svg" alt="Icon check">
            </form>
    `;
}


function handleProgress2() {
    let title = document.getElementById('addTaskH1');
    let button = document.getElementById('addTaskFlexButtons');
    title.innerHTML = `Create Task in Progress`;
    button.innerHTML = `
            <button id="createbutton" type="button" onclick="addTaskBoard(2)" class="createbutton">
                <p class="create-mobile">Create Task</p>
                <img class="check-icon-mobile" src="./IMGicons/check.svg" alt="Icon check">
            </form>
    `;
}


function handleProgress3() {
    let title = document.getElementById('addTaskH1');
    let button = document.getElementById('addTaskFlexButtons');
    title.innerHTML = `Create Task Awaiting Feedback`;
    button.innerHTML = `
            <button id="createbutton" type="button" onclick="addTaskBoard(3)" class="createbutton">
                <p class="create-mobile">Create Task</p>
                <img class="check-icon-mobile" src="./IMGicons/check.svg" alt="Icon check">
            </form>
    `;
}