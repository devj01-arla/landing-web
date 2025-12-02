<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Método no permitido']);
    exit;
}

$name = $_POST['name'] ?? '';
$email = $_POST['email'] ?? '';
$message = $_POST['message'] ?? '';

if (empty($name) || empty($email) || empty($message)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Todos los campos son requeridos']);
    exit;
}

// Validar el formato del correo electrónico
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Correo electrónico inválido']);
    exit;
}

$to = 'info@arla-asociados.com'; // El correo donde recibirás los mensajes
$subject = 'Nuevo mensaje de contacto desde la web';
$headers = "From: $email\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8\r\n";

$emailBody = "
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #f8f9fa; padding: 20px; border-radius: 5px; }
        .content { margin-top: 20px; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h2>Nuevo mensaje de contacto</h2>
            <p>Se ha recibido un nuevo mensaje desde el formulario de contacto de la web.</p>
        </div>
        <div class='content'>
            <div class='field'>
                <p class='label'>Nombre:</p>
                <p>" . htmlspecialchars($name) . "</p>
            </div>
            <div class='field'>
                <p class='label'>Email:</p>
                <p>" . htmlspecialchars($email) . "</p>
            </div>
            <div class='field'>
                <p class='label'>Mensaje:</p>
                <p>" . nl2br(htmlspecialchars($message)) . "</p>
            </div>
        </div>
    </div>
</body>
</html>
";

// Intentar enviar el correo
$sent = mail($to, $subject, $emailBody, $headers);

if ($sent) {
    echo json_encode(['success' => true, 'message' => 'Mensaje enviado correctamente']);
} else {
    // Registrar el error en un archivo de log
    error_log("Error al enviar el correo desde el formulario de contacto. Datos: " . print_r($_POST, true));
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Error al enviar el mensaje']);
} 