import mysql.connector

# Establishing connection to the MySQL database
connection = mysql.connector.connect(
    host='localhost',
    database='databaseproject',
    user='root',
    password='Son@2003'
)

def show_table(table_name):
    cursor = connection.cursor()
    try:
        cursor.execute(f"SELECT * FROM {table_name}")
        rows = cursor.fetchall()
        if rows:
            print(f"Contents of the '{table_name}' table:")
            for row in rows:
                print(row)
        else:
            print(f"The '{table_name}' table is empty.")
    except mysql.connector.Error as err:
        print("Error:", err)
     
    cursor.close()   
#1 Function to register a new professional
def register_professional(username, first_name, last_name, email, degree_name, institution_name, month_complete, year_complete, street_address, city, state, zip_code, qualifications, phone_number):
    cursor = connection.cursor()
    try:
        cursor.execute("INSERT INTO ProfessionalRegistration (Username, FirstName, LastName, EmailAddress, DegreeName, InstitutionName, MonthComplete, YearComplete, StreetAddress, City, State, Zip, Qualifications, PhoneNumber) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)", (username, first_name, last_name, email, degree_name, institution_name, month_complete, year_complete, street_address, city, state, zip_code, qualifications, phone_number))
        connection.commit()
        print("Professional registration request saved successfully.")
        show_table("ProfessionalRegistration")
        show_table("CreateProfRequest")
    except mysql.connector.Error as err:
        print("Error:", err)
    cursor.close()

#2 Function to register a new employer
def register_employer(username, company_name, street_address, city, state, zip_code, first_name, last_name, email, phone_number):
    cursor = connection.cursor()
    try:
        cursor.execute("INSERT INTO EmployerRegistration (Username, CompanyName, StreetAddress, City, State, Zip, FirstName, LastName, Email, PhoneNumber) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)", (username, company_name, street_address, city, state, zip_code, first_name, last_name, email, phone_number))
        connection.commit()
        print("Employer registration request saved successfully.")
        show_table("EmployerRegistration")
        show_table("CreateEmpRequest")
    except mysql.connector.Error as err:
        print("Error:", err)
    cursor.close()

#3 Function to modify professional profile
def modify_professional_profile(professional_id, first_name, last_name, email, degree_name, institution_name, month_complete, year_complete, street_address, city, state, zip_code, qualifications, phone_number):
    cursor = connection.cursor()
    try:
        cursor.execute("UPDATE Professional SET FirstName = %s, LastName = %s, EmailAddress = %s, DegreeName = %s, InstitutionName = %s, MonthComplete = %s, YearComplete = %s, StreetAddress = %s, City = %s, State = %s, Zip = %s, Qualifications = %s, PhoneNumber = %s WHERE ProfessionalID = %s", (first_name, last_name, email, degree_name, institution_name, month_complete, year_complete, street_address, city, state, zip_code, qualifications, phone_number, professional_id))
        connection.commit()
        print("Professional profile modified successfully.")
        show_table("Professional")
    except mysql.connector.Error as err:
        print("Error:", err)
    cursor.close()

#4 Function to modify employer profile
def modify_employer_profile(employer_id, company_name, street_address, city, state, zip_code, first_name, last_name, email, phone_number):
    cursor = connection.cursor()
    try:
        cursor.execute("UPDATE Employer SET CompanyName = %s, StreetAddress = %s, City = %s, State = %s, Zip = %s, FirstName = %s, LastName = %s, Email = %s, PhoneNumber = %s WHERE EmployerID = %s", (company_name, street_address, city, state, zip_code, first_name, last_name, email, phone_number, employer_id))
        connection.commit()
        print("Employer profile modified successfully.")
        show_table("Employer")
    except mysql.connector.Error as err:
        print("Error:", err)
    cursor.close()

#5 Function to initiate job matching for a professional
def initiate_job_matching(professional_id):
    cursor = connection.cursor()
    try:
        cursor.execute("INSERT INTO JobMatchingRequest (ProfessionalID) VALUES (%s)", (professional_id,))
        print("Job matching initiated for professional:", professional_id)
        show_table("JobMatchingRequest")
    except mysql.connector.Error as err:
        print("Error:", err)
    cursor.close()

#6 Function to post a job by an employer
def post_job(employer_id, position_name, contact_first_name, contact_last_name, contact_phone, contact_email, start_date, end_date, start_time, end_time, payment, qualifications):
    cursor = connection.cursor()
    try:
        cursor.execute("INSERT INTO Job (EmployerID, PositionName, ContactFirstName, ContactLastName, ContactPhone, ContactEmail, StartDate, EndDate, StartTime, EndTime, Payment, Qualifications) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)", (employer_id, position_name, contact_first_name, contact_last_name, contact_phone, contact_email, start_date, end_date, start_time, end_time, payment, qualifications))
        connection.commit()
        print("Job posted successfully.")
        show_table("Job")
    except mysql.connector.Error as err:
        print("Error:", err)
    cursor.close()

#7 Function to pay for professional account
def pay_professional_account(professional_id, payment_amount):
    cursor = connection.cursor()
    try:
        cursor.execute("UPDATE Professional SET Payment = Payment + %s WHERE ProfessionalID = %s", (payment_amount, professional_id))
        connection.commit()
        print("Professional account payment processed successfully.")
    except mysql.connector.Error as err:
        print("Error:", err)
    cursor.close()

#8 Function to pay for employer account
def pay_employer_account(employer_id, payment_amount):
    cursor = connection.cursor()
    try:
        cursor.execute("UPDATE Employer SET Payment = Payment + %s WHERE EmployerID = %s", (payment_amount, employer_id))
        connection.commit()
        print("Employer account payment processed successfully.")
        show_table("Employer")
    except mysql.connector.Error as err:
        print("Error:", err)
    cursor.close()
    
#9 Function to change professional member's password
def change_professional_password(username, new_password):
    cursor = connection.cursor()
    try:
        cursor.execute("UPDATE User SET Password = %s WHERE Username = %s AND UserType = 'Professional'", (new_password, username))
        connection.commit()
        print("Professional member password changed successfully.")
        show_table("User")
    except mysql.connector.Error as err:
        print("Error:", err)
    cursor.close()

#10 Function to change employer member's password
def change_employer_password(username, new_password):
    cursor = connection.cursor()
    try:
        cursor.execute("UPDATE User SET Password = %s WHERE Username = %s AND UserType = 'Employer'", (new_password, username))
        connection.commit()
        show_table("User")
        print("Employer member password changed successfully.")
    except mysql.connector.Error as err:
        print("Error:", err)
    cursor.close()
    
#11 Function to delete professional account
def delete_professional_account(professional_id):
    cursor = connection.cursor()
    try:
        cursor.execute("INSERT INTO ProfessionalProfileDeleteRequest (ProfessionalID) VALUES (%s)", (professional_id,))
        connection.commit()
        print("Professional account deleted successfully.")
        show_table("ProfessionalProfileDeleteRequest")
        show_table("Professional")
    except mysql.connector.Error as err:
        print("Error:", err)
    cursor.close()

#12 Function to delete employer account
def delete_employer_account(employer_id):
    cursor = connection.cursor()
    try:
        cursor.execute("DELETE FROM EmployerProfileDeleteRequest WHERE EmployerID = %s", (employer_id,))
        connection.commit()
        print("Employer account deleted successfully.")
        show_table("EmployerProfileDeleteRequest")
        show_table("Employer")
    except mysql.connector.Error as err:
        print("Error:", err)
    cursor.close()



#13 Function to change staff member's password
def change_staff_password(username, new_password):
    cursor = connection.cursor()
    try:
        cursor.execute("UPDATE User SET Password = %s WHERE Username = %s AND UserType = 'Staff'", (new_password, username))
        connection.commit()
        print("Staff member password changed successfully.")
    except mysql.connector.Error as err:
        print("Error:", err)
    cursor.close()

#14 Function to retrieve a request from a new professional and create an account
def retrieve_and_create_professional_account():
   show_table("CreateProfRequest")
   show_table("ProfessionalRegistration")
    
#15 Function to retrieve a request from a new employer and create an account
def retrieve_and_create_employer_account():
    show_table("CreateEmpRequest")
    show_table("EmployerRegistration")

#16 Function to retrieve a request from an existing professional to delete the account
def retrieve_and_delete_professional_account():
    show_table("ProfessionalProfileDeleteRequest")
    show_table("Professional")

#17 Function to retrieve a request from an existing employer to delete their account
def retrieve_and_delete_employer_account():
    show_table("EmployerProfileDeleteRequest")
    show_table("Employer")



#19 Function to initiate job matching and get the job out
def initiate_job_matching_for_professional(professional_id):
    cursor = connection.cursor()
    try:
        # SQL query to match jobs for a professional
        query = """
            SELECT j.*
            FROM Job j
            CROSS JOIN Professional p
            WHERE CONCAT(',', p.Qualifications, ',') LIKE CONCAT('%,', j.Qualifications, ',%')
            AND p.ProfessionalID = %s;
        """
        cursor.execute(query, (professional_id,))
        
        # Fetch and print the matched jobs
        matched_jobs = cursor.fetchall()
        if matched_jobs:
            print("Matched jobs for professional", professional_id)
            for job in matched_jobs:
                print(job)  # You can customize how you want to display the matched jobs
        else:
            print("No matched jobs found for professional", professional_id)
    except mysql.connector.Error as err:
        print("Error:", err)
    cursor.close()

def insert_staff_member(staff_id, username, first_name, last_name, email, phone_number):
    cursor = connection.cursor()
    try:
        # Insert staff member into the Staff table
        cursor.execute("INSERT INTO Staff (StaffID, Username, FirstName, LastName, Email, PhoneNumber) VALUES (%s, %s, %s, %s, %s, %s)",
                       (staff_id, username, first_name, last_name, email, phone_number))
        connection.commit()
        print("Staff member inserted successfully.")
        show_table("Staff")  
    except mysql.connector.Error as err:
        print("Error:", err)
    cursor.close()

def main_menu():
    while True:
        print("Welcome to the Database Project Menu!")
        print("Please select an option:")
        print("1. Register a new professional")
        print("2. Register a new employer")
        print("3. Modify a professional's profile")
        print("4. Modify an employer's profile")
        print("5. Initiate job matching for a professional")
        print("6. Post a job by an employer")
        print("7. Pay for a professional's account")
        print("8. Pay for an employer's account")
        print("9. Change a professional's password")
        print("10. Change an employer's password")
        print("11. Request deletion of a professional's account")
        print("12. Request deletion of an employer's account")
        print("13. Change a staff member's password")
        print("14. Retrieve and create a professional account")
        print("15. Retrieve and create an employer account")
        print("16. Retrieve and delete a professional account")
        print("17. Retrieve and delete an employer account")
        print("18. Initiate job matching for a professional")
        print("19. Create a new staff account")
        print("0. Exit")

        choice = input("Enter your choice (0-19): ")

        if choice == '1':
            username = input("Enter username: ")
            first_name = input("Enter first name: ")
            last_name = input("Enter last name: ")
            email = input("Enter email: ")
            degree_name = input("Enter degree name: ")
            institution_name = input("Enter institution name: ")
            month_complete = int(input("Enter month of completion (1-12): "))
            year_complete = int(input("Enter year of completion: "))
            street_address = input("Enter street address: ")
            city = input("Enter city: ")
            state = input("Enter state: ")
            zip_code = input("Enter zip code: ")
            qualifications = input("Enter qualifications (comma-separated): ")
            phone_number = input("Enter phone number: ")

            try:
                register_professional(username, first_name, last_name, email, degree_name, institution_name, month_complete, year_complete, street_address, city, state, zip_code, qualifications, phone_number)
              
            except mysql.connector.Error as err:
                print("Error:", err)

        elif choice == '2':
            username = input("Enter username: ")
            company_name = input("Enter company name: ")
            street_address = input("Enter street address: ")
            city = input("Enter city: ")
            state = input("Enter state: ")
            zip_code = input("Enter zip code: ")
            first_name = input("Enter first name: ")
            last_name = input("Enter last name: ")
            email = input("Enter email: ")
            phone_number = input("Enter phone number: ")

            try:
                register_employer(username, company_name, street_address, city, state, zip_code, first_name, last_name, email, phone_number)
               
            except mysql.connector.Error as err:
                print("Error:", err)

        elif choice == '3':
            professional_id = input("Enter professional ID: ")
            first_name = input("Enter new first name: ")
            last_name = input("Enter new last name: ")
            email = input("Enter new email: ")
            degree_name = input("Enter new degree name: ")
            institution_name = input("Enter new institution name: ")
            month_complete = int(input("Enter new month of completion (1-12): "))
            year_complete = int(input("Enter new year of completion: "))
            street_address = input("Enter new street address: ")
            city = input("Enter new city: ")
            state = input("Enter new state: ")
            zip_code = input("Enter new zip code: ")
            qualifications = input("Enter new qualifications (comma-separated): ")
            phone_number = input("Enter new phone number: ")

            try:
                modify_professional_profile(professional_id, first_name, last_name, email, degree_name, institution_name, month_complete, year_complete, street_address, city, state, zip_code, qualifications, phone_number)
                
            except mysql.connector.Error as err:
                print("Error:", err)

        elif choice == '4':
            employer_id = input("Enter employer ID: ")
            company_name = input("Enter new company name: ")
            street_address = input("Enter new street address: ")
            city = input("Enter new city: ")
            state = input("Enter new state: ")
            zip_code = input("Enter new zip code: ")
            first_name = input("Enter new first name: ")
            last_name = input("Enter new last name: ")
            email = input("Enter new email: ")
            phone_number = input("Enter new phone number: ")

            try:
                modify_employer_profile(employer_id, company_name, street_address, city, state, zip_code, first_name, last_name, email, phone_number)
                
            except mysql.connector.Error as err:
                print("Error:", err)

        elif choice == '5':
            professional_id = input("Enter professional ID: ")
            try:
                initiate_job_matching(professional_id)
                print("Job matching initiated for professional:", professional_id)
            except mysql.connector.Error as err:
                print("Error:", err)

        elif choice == '6':
            employer_id = input("Enter employer ID: ")
            position_name = input("Enter position name: ")
            contact_first_name = input("Enter contact first name: ")
            contact_last_name = input("Enter contact last name: ")
            contact_phone = input("Enter contact phone number: ")
            contact_email = input("Enter contact email: ")
            start_date = input("Enter start date (YYYY-MM-DD): ")
            end_date = input("Enter end date (YYYY-MM-DD): ")
            start_time = input("Enter start time (HH:MM:SS): ")
            end_time = input("Enter end time (HH:MM:SS): ")
            payment = float(input("Enter payment amount: "))
            qualifications = input("Enter qualifications (comma-separated): ")

            try:
                post_job(employer_id, position_name, contact_first_name, contact_last_name, contact_phone, contact_email, start_date, end_date, start_time, end_time, payment, qualifications)
                
            except mysql.connector.Error as err:
                print("Error:", err)

        elif choice == '7':
            professional_id = input("Enter professional ID: ")
            payment_amount = float(input("Enter payment amount: "))
            try:
                pay_professional_account(professional_id, payment_amount)
               
            except mysql.connector.Error as err:
                print("Error:", err)

        elif choice == '8':
            employer_id = input("Enter employer ID: ")
            payment_amount = float(input("Enter payment amount: "))
            try:
                pay_employer_account(employer_id, payment_amount)
                
            except mysql.connector.Error as err:
                print("Error:", err)

        elif choice == '9':
            username = input("Enter professional username: ")
            new_password = input("Enter new password: ")
            try:
                change_professional_password(username, new_password)
            except mysql.connector.Error as err:
                print("Error:", err)

        elif choice == '10':
            username = input("Enter employer username: ")
            new_password = input("Enter new password: ")
            try:
                change_employer_password(username, new_password)
            except mysql.connector.Error as err:
                print("Error:", err)

        elif choice == '11':
            professional_id = input("Enter professional ID: ")
            try:
                delete_professional_account(professional_id)
            except mysql.connector.Error as err:
                print("Error:", err)

        elif choice == '12':
            employer_id = input("Enter employer ID: ")
            try:
                delete_employer_account(employer_id)
            except mysql.connector.Error as err:
                print("Error:", err)

        elif choice == '13':
            username = input("Enter staff member username: ")
            new_password = input("Enter new password: ")
            try:
                change_staff_password(username, new_password)
            except mysql.connector.Error as err:
                print("Error:", err)

        elif choice == '14':
           retrieve_and_create_professional_account()

        elif choice == '15':
            retrieve_and_create_employer_account()

        elif choice == '16':
            retrieve_and_delete_professional_account()

        elif choice == '17':
            retrieve_and_delete_employer_account()

        elif choice == '18':
            professional_id = input("Enter professional ID: ")
            
            try:
                initiate_job_matching_for_professional(professional_id)
            except mysql.connector.Error as err:
                print("Error:", err)

        elif choice == '19':
            # Prompt user for staff member details
            staff_id = input("Enter new staff ID: ")
            username = input("Enter new staff username: ")
            first_name = input("Enter new staff first name: ")
            last_name = input("Enter new staff last name: ")
            email = input("Enter new staff email: ")
            phone_number = input("Enter new staff phone number: ")
            try:
                 insert_staff_member(staff_id, username, first_name, last_name, email, phone_number)
                
            except mysql.connector.Error as err:
                print("Error:", err)

        elif choice == '0':
            print("Exiting the program. Goodbye!")
            break
        else:
            print("Invalid choice. Please try again.")
if __name__ == "__main__":
    main_menu()