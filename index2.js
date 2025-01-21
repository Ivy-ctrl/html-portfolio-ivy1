document.addEventListener("DOMContentLoaded", function () {
    const studentForm = document.getElementById("studentForm");
    const studentTableBody = document.getElementById("studentTableBody");

    const loadStudents = () => {
        const students = JSON.parse(localStorage.getItem("students")) || [];
        students.forEach((student, index) => addStudentToTable(student, index));
    };

    const saveStudents = (students) => {
        localStorage.setItem("students", JSON.stringify(students));
    };

    const addStudentToTable = (student, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.surname}</td>
            <td>${student.age}</td>
            <td>${student.program}</td>
            <td>${student.number}</td>
            <td>
                <button class="delete-button" data-index="${index}">Delete</button>
            </td>
        `;
        studentTableBody.appendChild(row);

        row.querySelector(".delete-button").addEventListener("click", function () {
            deleteStudent(index);
        });
    };

    const deleteStudent = (index) => {
        const students = JSON.parse(localStorage.getItem("students")) || [];
        students.splice(index, 1); // Remove the student at the given index
        saveStudents(students); // Save the updated list
        refreshTable(); // Refresh the table
    };
    const refreshTable = () => {
        studentTableBody.innerHTML = ""; // Clear the table
        loadStudents(); // Reload students
    };

    studentForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.getElementById("name").value;
        const surname = document.getElementById("surname").value;
        const age = document.getElementById("age").value;
        const program = document.getElementById("program").value;
        const number = document.getElementById("number").value;

        const student = { name, surname, age, program, number }


        const students = JSON.parse(localStorage.getItem("students")) || [];
        students.push(student);
        saveStudents(students);

        addStudentToTable(student, students.length - 1);

        studentForm.reset();
    });

    loadStudents();
});
