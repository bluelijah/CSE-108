from flask import Flask, render_template, request, jsonify
from flask_cors import CORS

#USES FLASK TO SERVE FRONTEND INDEX.HTML AND BACKEND API REST API POINTS
#REMOVE ALL CORS IF SERVING FRONTEND SEPARATELY 
#REMOVE ALL EXTERNAL API CALLS AND ERROR CHECKS


app = Flask(__name__)
CORS(app)  #Enable CORS for all routes

#In-memory storage for grades (dictionary format)
grades_db = {
    "Shaquiel Oniel": 95.0,
    "Barrack Obama": 87.5,
    "Lassi Sevanto": 92.0,
    "Gurkarn Singh": 78.5
}

# Serve the frontend HTML page
@app.route('/')
def index():
    return render_template('index.html')

# REQUIREMENT - HAVE SAME FUNCTIONALITY AS PREVIOUS LAB
# GET /grades - Return all students and grades
@app.route('/grades', methods=['GET'])
def get_all_grades():
    return jsonify(grades_db), 200

# GET /grades/<student_name> - Return specific student's grade
@app.route('/grades/<student_name>', methods=['GET'])
def get_grade(student_name):
    if student_name in grades_db:
        return jsonify({student_name: grades_db[student_name]}), 200
    else:
        return jsonify({"error": "Student not found"}), 404

# POST /grades - Add a new student and grade
@app.route('/grades', methods=['POST'])
def add_grade():
    data = request.get_json()
    
    # Validate input
    if not data or 'name' not in data or 'grade' not in data:
        return jsonify({"error": "Missing name or grade"}), 400
    
    name = data['name']
    grade = data['grade']
    
    # Check if student already exists
    if name in grades_db:
        return jsonify({"error": "Student already exists. Use PUT to update."}), 400
    
    # Validate grade is a number
    try:
        grade = float(grade)
    except (ValueError, TypeError):
        return jsonify({"error": "Grade must be a number"}), 400
    
    # Add to database
    grades_db[name] = grade
    
    # Return updated database
    return jsonify(grades_db), 201

# PUT /grades/<student_name> - Update a student's grade
@app.route('/grades/<student_name>', methods=['PUT'])
def update_grade(student_name):
    data = request.get_json()
    
    # Validate input
    if not data or 'grade' not in data:
        return jsonify({"error": "Missing grade"}), 400
    
    # Check if student exists
    if student_name not in grades_db:
        return jsonify({"error": "Student not found"}), 404
    
    # Validate grade is a number
    try:
        grade = float(data['grade'])
    except (ValueError, TypeError):
        return jsonify({"error": "Grade must be a number"}), 400
    
    # Update grade
    grades_db[student_name] = grade
    
    # Return updated database
    return jsonify(grades_db), 200

# DELETE /grades/<student_name> - Delete a student
@app.route('/grades/<student_name>', methods=['DELETE'])
def delete_grade(student_name):
    # Check if student exists
    if student_name not in grades_db:
        return jsonify({"error": "Student not found"}), 404
    
    # Delete student
    del grades_db[student_name]
    
    # Return updated database
    return jsonify(grades_db), 200

if __name__ == '__main__':
    app.run(debug=True, port=5000)