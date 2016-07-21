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
            background: url('/img/errors/dreamsArkRef39.png') center center no-repeat;
            background-size: cover;
        }

        .content {
            text-align: center;
            display: inline-block;
        }

        .title {
            font-size: 48px;
            margin-bottom: 20px;
            color: black;
            font-weight: bold;

        }

        a {
            font-size: 36px;
            text-decoration: none;
            color: dodgerblue;
        }
    </style>
</head>
<body>
<div class="container">
    <div class="content">
        <div class="title">@lang('auth.please-signup')</div>
        <a href="{{ route('login')  }}">@lang('auth.click-to-login')</a>
    </div>
</div>
</body>
</html>
