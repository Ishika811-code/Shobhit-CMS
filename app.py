import csv
import io
from flask import Flask, render_template, request, redirect, url_for, session, Response, flash, make_response

app = Flask(__name__)
app.secret_key = "shobhit-university-gangoh-secret-key"

MODULES = [
    ("Dashboard", "layout-dashboard", "Overview"),
    ("Admissions", "graduation-cap", "Students"),
    ("Students", "users", "Students"),
    ("Faculty & Staff", "briefcase-business", "People"),
    ("Departments", "building-2", "Academics"),
    ("Courses & Subjects", "book-open", "Academics"),
    ("Timetable", "calendar-days", "Academics"),
    ("Attendance", "clipboard-check", "Academics"),
    ("Examinations", "file-text", "Academics"),
    ("Results & Grades", "chart-no-axes-combined", "Academics"),
    ("Assignments", "book-marked", "Academics"),
    ("Fees & Payments", "wallet", "Finance"),
    ("Scholarships", "credit-card", "Finance"),
    ("Library", "library", "Campus"),
    ("Hostel", "home", "Campus"),
    ("Transport", "bus", "Campus"),
    ("Campus & Rooms", "building-2", "Campus"),
    ("HR & Payroll", "user-cog", "Administration"),
    ("Leave Management", "calendar-days", "Administration"),
    ("Placement & Careers", "briefcase", "Student Services"),
    ("Health Centre", "stethoscope", "Student Services"),
    ("Announcements", "megaphone", "Communication"),
    ("Messages", "message-square", "Communication"),
    ("Reports & Analytics", "trending-up", "Administration"),
    ("Settings", "settings", "Administration"),
]

SEED_DATA = {
    "Students": [
        ["SHU-2023-CS089", "Shivam Kumar", "Computer Science", "B.Tech CSE", "Gangoh", "Active"],
        ["SHU-2024-MBA021", "Aditi Verma", "Management", "MBA", "Gangoh", "Active"],
        ["SHU-2022-EC044", "Rahul Singh", "Electronics", "B.Tech ECE", "Saharanpur", "Active"],
    ],
    "Admissions": [
        ["APP-26091", "Mehak Sharma", "B.Tech CSE", "2026-27", "Documents verified"],
        ["APP-26092", "Arjun Malik", "MBA", "2026-27", "Under review"],
    ],
    "Faculty & Staff": [
        ["SHU-FAC-014", "Dr. Ananya Sharma", "Computer Science", "Faculty", "Gangoh"],
        ["SHU-FAC-022", "Dr. R. Verma", "Management", "Faculty", "Saharanpur"],
        ["SHU-STF-031", "Neha Gupta", "Administration", "Staff", "Gangoh"],
    ],
    "Courses & Subjects": [
        ["CSE301", "Database Management Systems", "B.Tech CSE", "3", "Dr. A. Sharma"],
        ["CSE302", "Operating Systems", "B.Tech CSE", "3", "Prof. K. Rao"],
    ],
    "Attendance": [
        ["10 Nov 2026", "CSE-5A", "Database Management", "42", "39", "3"],
        ["10 Nov 2026", "CSE-5B", "Operating Systems", "38", "35", "3"],
    ],
    "Fees & Payments": [
        ["REC-2026-091", "Shivam Kumar", "Tuition fee", "₹65,000", "Paid"],
        ["REC-2026-092", "Aditi Verma", "Hostel fee", "₹28,000", "Pending"],
    ],
    "Examinations": [
        ["EX-501", "Mid Semester", "B.Tech CSE", "18 Nov 2026", "Scheduled"],
        ["EX-502", "Practical Examination", "B.Tech ECE", "22 Nov 2026", "Scheduled"],
    ],
    "Library": [
        ["LIB-0091", "Database System Concepts", "Shivam Kumar", "16 Nov 2026", "Issued"],
        ["LIB-0102", "Clean Code", "Rahul Singh", "12 Nov 2026", "Overdue"],
    ],
    "Hostel": [
        ["H-201", "Block A · Room 201", "Shivam Kumar", "Gangoh", "Occupied"],
    ],
    "Transport": [
        ["BUS-12", "Gangoh - Saharanpur", "R. Kumar", "42", "Active"],
    ],
    "Announcements": [
        ["AN-101", "Mid-semester examination schedule released", "Examination Cell", "10 Nov 2026", "Important"],
        ["AN-102", "Library hours extended", "Central Library", "09 Nov 2026", "Update"],
    ],
}

COLUMNS = {
    "Students": ["Student ID", "Student name", "Department", "Programme", "Campus", "Status"],
    "Admissions": ["Application ID", "Applicant", "Programme", "Session", "Application status"],
    "Faculty & Staff": ["Employee ID", "Name", "Department", "Designation", "Campus"],
    "Courses & Subjects": ["Course code", "Course title", "Programme", "Semester", "Instructor"],
    "Attendance": ["Date", "Section", "Course", "Enrolled", "Present", "Absent"],
    "Fees & Payments": ["Receipt ID", "Student", "Fee type", "Amount", "Payment status"],
    "Examinations": ["Exam ID", "Examination", "Programme", "Date", "Status"],
    "Library": ["Book ID", "Book title", "Issued to", "Due date", "Status"],
    "Hostel": ["Room ID", "Room / Block", "Resident", "Campus", "Status"],
    "Transport": ["Vehicle ID", "Route", "Driver", "Capacity", "Status"],
    "Announcements": ["Notice ID", "Title", "Published by", "Date", "Priority"],
}

PEOPLE = {
    "Student": {
        "name": "Shivam Kumar",
        "id": "SHU-2023-CS089",
        "dept": "B.Tech · Computer Science & Engineering",
        "campus": "Gangoh Campus",
        "avatar": "SK",
    },
    "Faculty": {
        "name": "Dr. Ananya Sharma",
        "id": "SHU-FAC-014",
        "dept": "Department of Computer Science",
        "campus": "Gangoh Campus",
        "avatar": "AS",
    },
    "Admin": {
        "name": "Campus Administrator",
        "id": "SHU-ADMIN-001",
        "dept": "University Administration",
        "campus": "All campuses",
        "avatar": "CA",
    },
}

STUDENT_MENU = [
    "Dashboard", "Courses & Subjects", "Timetable", "Attendance", "Examinations",
    "Results & Grades", "Assignments", "Fees & Payments", "Scholarships",
    "Library", "Hostel", "Transport", "Announcements", "Messages",
]

FACULTY_MENU = [
    "Dashboard", "Courses & Subjects", "Timetable", "Attendance", "Examinations",
    "Results & Grades", "Assignments", "Students", "Announcements", "Messages",
]

GROUPS = [
    "Overview", "Students", "People", "Academics", "Finance",
    "Campus", "Student Services", "Communication", "Administration",
]


@app.after_request
def add_no_cache_headers(response):
    response.headers["Cache-Control"] = "no-store, no-cache, must-revalidate, max-age=0"
    response.headers["Pragma"] = "no-cache"
    response.headers["Expires"] = "0"
    return response


def get_allowed_modules(role):
    if role == "Admin":
        return MODULES
    allowed_names = STUDENT_MENU if role == "Student" else FACULTY_MENU
    return [m for m in MODULES if m[0] in allowed_names]


def get_records_for_module(module_name):
    custom = session.get("custom_records", {})
    return custom.get(module_name, SEED_DATA.get(module_name, []))


@app.route("/", methods=["GET"])
def index():
    if not session.get("authenticated"):
        return redirect(url_for("login"))
    return redirect(url_for("portal", module="Dashboard"))


@app.route("/login", methods=["GET", "POST"])
def login():
    error = None
    selected_role = "Student"
    login_id = ""

    if request.method == "POST":
        selected_role = request.form.get("role", "Student")
        login_id = request.form.get("login_id", "").strip()
        password = request.form.get("password", "").strip()

        if not login_id or not password:
            error = "Enter your university ID/email and password."
        else:
            session.clear()
            session["authenticated"] = True
            session["role"] = selected_role
            session["campus"] = "Gangoh"
            session["login_id"] = login_id
            return redirect(url_for("portal", module="Dashboard"))

    return render_template("login.html", error=error, selected_role=selected_role, login_id=login_id)


@app.route("/logout", methods=["GET", "POST"])
def logout():
    session.pop("authenticated", None)
    session.clear()
    resp = make_response(redirect(url_for("login")))
    resp.delete_cookie(app.config.get("SESSION_COOKIE_NAME", "session"))
    return resp


@app.route("/switch-role/<new_role>")
def switch_role(new_role):
    if not session.get("authenticated"):
        return redirect(url_for("login"))
    if new_role in PEOPLE:
        session["role"] = new_role
    return redirect(url_for("portal", module="Dashboard"))


@app.route("/set-campus", methods=["POST"])
def set_campus():
    if not session.get("authenticated"):
        return redirect(url_for("login"))
    campus = request.form.get("campus", "Gangoh")
    current_module = request.form.get("current_module", "Dashboard")
    session["campus"] = campus
    return redirect(url_for("portal", module=current_module))


@app.route("/portal", methods=["GET"])
@app.route("/portal/<path:module>", methods=["GET"])
def portal(module="Dashboard"):
    if not session.get("authenticated"):
        return redirect(url_for("login"))

    role = session.get("role", "Student")
    campus = session.get("campus", "Gangoh")
    user = PEOPLE.get(role, PEOPLE["Student"])
    allowed_modules = get_allowed_modules(role)

    valid_names = [m[0] for m in MODULES]
    if module not in valid_names:
        module = "Dashboard"

    rows = get_records_for_module(module)
    headings = COLUMNS.get(module, ["Reference", "Name / Description", "Department / Category", "Date", "Status"])

    query = request.args.get("q", "").strip()
    row_filter = request.args.get("filter", "").strip()

    filtered = rows
    if query:
        filtered = [r for r in filtered if query.lower() in " ".join(r).lower()]
    if row_filter:
        filtered = [r for r in filtered if row_filter.lower() in " ".join(r).lower()]

    module_category = next((m[2] for m in MODULES if m[0] == module), "UNIVERSITY SERVICES")

    return render_template(
        "portal.html",
        role=role,
        campus=campus,
        user=user,
        active=module,
        module_category=module_category,
        groups=GROUPS,
        allowed_modules=allowed_modules,
        headings=headings,
        rows=rows,
        filtered=filtered,
        query=query,
        row_filter=row_filter,
    )


@app.route("/portal/<path:module>/add", methods=["POST"])
def add_record(module):
    if not session.get("authenticated"):
        return redirect(url_for("login"))

    headings = COLUMNS.get(module, ["Reference", "Name / Description", "Department / Category", "Date", "Status"])
    values = [request.form.get(f"field_{i}", "").strip() for i in range(len(headings))]

    if not any(values):
        flash("Enter at least one field.")
        return redirect(url_for("portal", module=module))

    new_row = [v if v else "Not set" for v in values]
    custom = session.get("custom_records", {})
    existing = custom.get(module, list(SEED_DATA.get(module, [])))
    custom[module] = [new_row] + existing
    session["custom_records"] = custom

    flash("Record added to this session.")
    return redirect(url_for("portal", module=module))


@app.route("/portal/<path:module>/export")
def export_csv(module):
    if not session.get("authenticated"):
        return redirect(url_for("login"))

    rows = get_records_for_module(module)
    headings = COLUMNS.get(module, ["Reference", "Name / Description", "Department / Category", "Date", "Status"])
    query = request.args.get("q", "").strip()
    row_filter = request.args.get("filter", "").strip()

    filtered = rows
    if query:
        filtered = [r for r in filtered if query.lower() in " ".join(r).lower()]
    if row_filter:
        filtered = [r for r in filtered if row_filter.lower() in " ".join(r).lower()]

    output = io.StringIO()
    writer = csv.writer(output)
    writer.writerow(headings)
    writer.writerows(filtered)

    filename = f"{module.lower().replace(' ', '_')}.csv"
    return Response(
        output.getvalue(),
        mimetype="text/csv",
        headers={"Content-Disposition": f"attachment;filename={filename}"},
    )


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
