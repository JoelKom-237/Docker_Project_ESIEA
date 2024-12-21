import axios from 'axios';
import { useEffect, useState } from "react";

const baseUrl = "http://localhost:3001"; 

function Student() {
  const [id, setId] = useState('');
  const [stname, setName] = useState("");
  const [course, setCourse] = useState("");
  const [fee, setFee] = useState("");

  const [students, setStudents] = useState([]);

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    const result = await axios.get(`${baseUrl}/api/student/`);
    setStudents(result.data.data);
    console.log(result.data);
  };

  const handleSave = async (event) => {
    event.preventDefault();
    try {
      await axios.post(`${baseUrl}/api/student/add`, {
        stname,
        course,
        fee
      });
      alert("Etudiant ajouté avec succès");
      resetForm();
      loadStudents();
    } catch (err) {
      alert("Echec lors de l'ajout de l'étudiant");
    }
  };

  const handleEdit = (student) => {
    setId(student.id);
    setName(student.stname);
    setCourse(student.course);
    setFee(student.fee);
  };

  const handleDelete = async (id) => {
    await axios.delete(`${baseUrl}/api/student/delete/${id}`);
    alert("Etudiant supprimé avec succès");
    loadStudents();
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`${baseUrl}/api/student/update/${id}`, {
        stname,
        course,
        fee
      });
      alert("Enregistrement mis à jour");
      resetForm();
      loadStudents();
    } catch (err) {
      alert("Mise à jour échouée");
    }
  };

  const resetForm = () => {
    setId('');
    setName('');
    setCourse('');
    setFee('');
  };

  return (
    <div>
      <h1>Student Details</h1>
      <div className="container mt-4">
        <form>
          <div className="form-group">
            <input type="text" className="form-control" id="student_id" hidden value={id} />
            <label>Student Name</label>
            <input type="text" className="form-control" id="name" value={stname} onChange={(event) => setName(event.target.value)} />
          </div>
          <div className="form-group">
            <label>Course</label>
            <input type="text" className="form-control" id="course" value={course} onChange={(event) => setCourse(event.target.value)} />
          </div>
          <div className="form-group">
            <label>Fee</label>
            <input type="text" className="form-control" id="fee" value={fee} onChange={(event) => setFee(event.target.value)} />
          </div>
          <div>
            <button className="btn btn-primary mt-4" onClick={handleSave}>Register</button>
            <button className="btn btn-warning mt-4" onClick={handleUpdate}>Update</button>
          </div>
        </form>
      </div>
      <table className="table table-dark" align="center">
        <thead>
          <tr>
            <th scope="col">Student Id</th>
            <th scope="col">Student Name</th>
            <th scope="col">Course</th>
            <th scope="col">Fee</th>
            <th scope="col">Option</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <th scope="row">{student.id}</th>
              <td>{student.stname}</td>
              <td>{student.course}</td>
              <td>{student.fee}</td>
              <td>
                <button type="button" className="btn btn-warning" onClick={() => handleEdit(student)}>Edit</button>
                <button type="button" className="btn btn-danger" onClick={() => handleDelete(student.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Student;
