<!DOCTYPE html>
<html>
<head>
    <title>Access Denied</title>
    <style>
        html, body {
            height: 100%;
        }

        body {
            margin: 0;
            padding: 0;
            width: 100%;
            color: #B0BEC5;
            display: table;
            font-weight: 100;
            font-family: 'Lato';
        }

        .container {
            text-align: center;
            display: table-cell;
            vertical-align: middle;
        }

        .content {
            text-align: center;
            display: inline-block;
        }

        .title {
            font-size: 48px;
            margin-bottom: 40px;
        }
        a { font-size: 36px; text-decoration: none; }
    </style>
</head>
<body>
<div class="container">
    <div class="content">
        <div class="title">You don't have permission to access this URL.</div>
        <a href="{{ request()->server('HTTP_REFERER') }}">Go Back</a>
    </div>
</div>
</body>
</html>
