import imaplib
import email
import os
from app import utils, models
from app.database import SessionLocal
from dotenv import load_dotenv

load_dotenv()

EMAIL_ADDRESS = os.getenv("EMAIL_ADDRESS")
EMAIL_PASSWORD = os.getenv("EMAIL_PASSWORD")

def process_imap_emails():
    """
    Connects to the Gmail IMAP server, reads unseen emails with a specific subject,
    evaluates the RPN expression found in the email body, and saves the result in the database.
    """
    
    # Connect to Gmail's IMAP server.
    mail = imaplib.IMAP4_SSL("imap.gmail.com")
    mail.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
    mail.select("inbox")

    _, data = mail.search(None, '(UNSEEN SUBJECT "RPN")')
    mail_ids = data[0].split()

    db = SessionLocal()
    results = []

    for mail_id in mail_ids:
        _, msg_data = mail.fetch(mail_id, "(RFC822)")
        for response_part in msg_data:
            if isinstance(response_part, tuple):
                msg = email.message_from_bytes(response_part[1])
                from_ = msg["from"]
                body = ""

                if msg.is_multipart():
                    for part in msg.walk():
                        if part.get_content_type() == "text/plain":
                            body += part.get_payload(decode=True).decode()
                else:
                    body = msg.get_payload(decode=True).decode()

                # Handle multiple lines
                lines = body.strip().splitlines()
                for line in lines:
                    expression = line.strip()
                    if not expression:
                        continue  # Skip empty lines

                    try:
                        result = utils.evaluate_rpn(expression)

                        # Save to DB
                        op = models.Operation(expression=expression, result=result)
                        db.add(op)
                        db.commit()

                        results.append({
                            "from": from_,
                            "expression": expression,
                            "result": result
                        })
                    except Exception as e:
                        results.append({
                            "from": from_,
                            "expression": expression,
                            "error": str(e)
                        })

    db.close()
    mail.logout()
    return results
