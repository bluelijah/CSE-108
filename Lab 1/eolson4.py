import json
import os

def clear_console():
    # Windows
    if os.name == 'nt':
        os.system('cls')
    # macOS/Linux
    else:
        os.system('clear')


def main():
    print("\nWelcome to Lab 1! What function would you like to access?\n\n" \
    "1. Adding Program\n" \
    "2. Punishment Automation\n" \
    "3. Word Count\n" \
    "4. Class Schedule Formatting\n" \
    "5. Grades\n\n" \
    "Type the number of the function you would like to access: ")
    userInput = input()
    if userInput == "1":
        addingProgram()
    elif userInput == "2":
        punishmentAutomation()
    elif userInput == "3":
        wordCount()
    elif userInput == "4":
        classScheduleFormatting()
    elif userInput == "5":
        grades()
    else:
        print("Invalid input. Please enter a number from 1 to 5.") 


def addingProgram():
    print("Enter two or more numbers separated by spaces: ")
    userString = input()
    numbers = userString.split()
    
    if len(numbers) < 2:
        print("You must enter at least two numbers, and no letters.")
        return

    converted_numbers = []
    for x in numbers:
        try:
            converted_numbers.append(float(x))
        except ValueError:
            print(f"Invalid input detected: '{x}' is not a number.")
            return

    total = sum(converted_numbers)
    print("The total is: " + str(total))



def punishmentAutomation():
    print("Enter the number of lines you want to write: ")
    userInput = input()
    n = int(userInput)
    if n <= 0:
        print("You must enter a positive integer.")
        return
    print("What would you like to write", n, "times?")
    userString = input()
    filename = "CompletedPunishment.txt"
    with open(filename, "w") as file:
        for i in range(n):
            file.write(userString + "\n")
    print("Your punishment has been written to", filename)
        
        
def wordCount():
    print("Enter a word: ")
    inputWord = input()
    inputWordLower = inputWord.lower()
    count = 0
    with open("PythonSummary.txt", "r") as file:
        for line in file:
            lineLower = line.lower()
            count = count + lineLower.count(inputWordLower)
    print("The word", inputWord, "appears", count, "times.")




class Course:
    def __init__(self, course_num, dept, number, name, credits, days, start, end, avg_grade):
        self.course_num = course_num
        self.dept = dept
        self.number = number
        self.name = name
        self.credits = credits
        self.days = days
        self.start = start
        self.end = end
        self.avg_grade = avg_grade

    def format(self):
        return (
            f"COURSE {self.course_num}: {self.dept}{self.number}: {self.name}\n"
            f"Number of Credits: {self.credits}\n"
            f"Days of Lectures: {self.days}\n"
            f"Lecture Time: {self.start} - {self.end}\n"
            f"Stat: on average, students get {self.avg_grade}% in this course\n"
        )

def classScheduleFormatting():
    courses = []

    with open("classesInput.txt", "r") as file:
        num_courses = int(file.readline().strip())

        for i in range(1, num_courses + 1):
            dept = file.readline().strip()
            number = file.readline().strip()
            name = file.readline().strip()
            credits = file.readline().strip()
            days = file.readline().strip()
            start = file.readline().strip()
            end = file.readline().strip()
            avg_grade = file.readline().strip()

            course = Course(i, dept, number, name, credits, days, start, end, avg_grade)
            courses.append(course)
    
    with open("FormattedCourses.txt", "w") as outfile:
        for course in courses:
            outfile.write(course.format())
            outfile.write("\n")



def grades():
    print("What would you like to do?\n\n"
    "1. Create a new grade file\n"
    "2. Request the grade of a student\n"
    "3. Edit a grade\n"
    "4. Delete a grade\n"
    "5. Return to main menu\n\n"
    "Type the number of the function you would like to access: ")
    userInput = input()
    if userInput == "1":
        createGradeFile()
    elif userInput == "2":
        requestGrade()
    elif userInput == "3":
        editGrade()
    elif userInput == "4":
        deleteGrade()
    elif userInput == "5":
        clear_console()
        main()
    else:
        print("Invalid input. Please enter a number from 1 to 4.")
    
def createGradeFile():
    print("Enter student name and grade separated by a dash (-): ")
    studentInfo = input()
    name, grade = [x.strip() for x in studentInfo.split('-')]
    newStudent = {name: grade}
    filename = "grades.txt"
    with open(filename, "w") as file:
        json.dump(newStudent, file)

def requestGrade():
    print("Enter the name of the student whose grade you want to request: ")
    studentName = input()
    lowerName = studentName.lower()
    filename = "grades.txt"
    with open(filename, "r") as file:
        grades = json.load(file)
        for name, grade in grades.items():
            if name.lower() == lowerName:
                print(f"{name}'s grade is {grade}")
                return
        print(f"No grade found for {studentName}")

def editGrade():
    print("Enter the name of the student whose grade you want to edit: ")
    studentName = input()
    lowerName = studentName.lower()
    filename = "grades.txt"
    with open(filename, "r") as file:
        grades = json.load(file)
        for name, grade in grades.items():
            if name.lower() == lowerName:
                grades[name] = input(f"Enter the new grade for {name}: ")
                with open(filename, "w") as file:
                    json.dump(grades, file)
                print(f"{name}'s grade has been updated.") 
            else:
                print(f"No student found with the name {studentName}")
                return   

def deleteGrade():
    print("Enter the name of the student whose grade you want to delete: ")
    studentName = input()
    lowerName = studentName.lower()
    filename = "grades.txt"
    with open(filename, "r") as file:
        grades = json.load(file)
        for name, grade in grades.items():
            if name.lower() == lowerName:
                with open(filename, "w") as file:
                    del grades[name]
                    json.dump(grades, file)
                    print(f"{name} and their grade has been deleted.") 
                break
            else:
                print(f"No student found with the name {studentName}")
                return
    
if __name__ == "__main__":
    main()