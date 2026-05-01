<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . '/vendoremail/autoload.php';

/* ===============================
   INPUT (Example)
================================= */
$ticketno = 1255;
$email    = 'skmahapatra033@gmail.com';
$adminemail = 'admin@conduitindia.com';
$apppassword = 'ocptiebbkahxuoru';

/* ===============================
   MAIL SEND FUNCTION
================================= */
function sendTicketMail($toEmail, $ticketno)
{
    $mail = new PHPMailer(true);

    try {

        /* ===============================
           SMTP CONFIG — GOOGLE WORKSPACE
        ================================= */
       $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com';
        $mail->SMTPAuth   = true;
        $mail->AuthType   = 'LOGIN';

        $mail->Username   = $adminemail;
        $mail->Password   = $apppassword; // ✅ NO SPACES

        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = 587;

        $mail->Timeout    = 30;
        $mail->CharSet    = 'UTF-8';

        // DEBUG (remove after success)
        $mail->SMTPDebug  = 2;
        $mail->Debugoutput = 'html';

        /* ===============================
           FROM / TO
        ================================= */
        $mail->setFrom('admin@conduitindia.com', 'Conduit India Support');
        $mail->addAddress($toEmail);

        /* ===============================
           SUBJECT
        ================================= */
        $mail->Subject = "TicketNow - Incident Alert (Ticket No: {$ticketno})";

        /* ===============================
           HTML BODY
        ================================= */
        $mailBody = "
        <html>
        <body style='font-family: Arial; line-height:1.6'>
            <p><b>Dear User,</b></p>

            <p>Greetings from <b>Conduit TechNet Pvt. Ltd.</b></p>

            <p><b>Incident update & ticket details:</b></p>

            <table border='1' cellpadding='8' cellspacing='0' width='650'>
                <tr><td><b>Incident</b></td><td>Ticket Creation </td></tr>
                <tr><td><b>Ticket No</b></td><td>{$ticketno}</td></tr>
                <tr><td><b>Ticket Title</b></td><td>E-Way Bill Print</td></tr>
                <tr><td><b>Reported By</b></td><td>Pharco Pharma</td></tr>
                <tr><td><b>Assigned To</b></td><td>Ritesh Jain</td></tr>
                <tr><td><b>Status</b></td><td>Under Testing</td></tr>
                <tr><td><b>Priority</b></td><td>High</td></tr>
                <tr><td><b>Due Date</b></td><td>27-Feb-2026</td></tr>
                <tr><td><b>Estimated Effort</b></td><td>24 Hours</td></tr>
                <tr><td><b>Effort Approval</b></td><td>In Approval</td></tr>
            </table>

            <p>
                Please login to the ticketing portal:<br>
                <a href='http://ticketnow.conduitindia.com/'>
                    http://ticketnow.conduitindia.com/
                </a>
            </p>

            <p style='color:gray'>
                System Generated Alert – No Reply Required
            </p>
        </body>
        </html>";

        $mail->isHTML(true);
        $mail->Body    = $mailBody;
        $mail->AltBody = strip_tags($mailBody);

        /* ===============================
           SEND
        ================================= */
        $mail->send();

        return [
            "status"  => true,
            "message" => "Email sent successfully"
        ];

    } catch (Exception $e) {
        return [
            "status"  => false,
            "message" => "Mailer Error: " . $mail->ErrorInfo
        ];
    }
}

/* ===============================
   EXECUTE
================================= */
$response = sendTicketMail($email, $ticketno);
header('Content-Type: application/json');
echo json_encode($response);
