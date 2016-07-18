<?php

namespace DreamsArk\Http\Controllers\Home;

use DreamsArk\Http\Controllers\Controller;
use Illuminate\Cookie\CookieJar;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

/**
 * Class HomeController
 *
 * @package DreamsArk\Http\Controllers\Home
 */
class HomeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return Response
     * @internal param Request $request
     */
    public function index()
    {
        return view('index');
    }

    /**
     * @param Request $request
     * @param CookieJar $cookie
     * @return \Illuminate\Http\RedirectResponse
     */
    public function skip(Request $request, CookieJar $cookie)
    {

        if ($request->get('skip', false)) {
            $cookie->queue(cookie('intro', 'skipped'));
        }

        return redirect()->route('home');

    }

    /**
     * Change Language
     *
     * @param \Illuminate\Http\Request $request
     * @param $language
     * @param \Illuminate\Foundation\Application $application
     * @return
     */
    public function changeLanguage(Request $request, $language, Application $application)
    {

        $request->session()->set('language', $language);
        $application->setLocale($language);

        return redirect()->back()->withStatus(
            trans('notifications.language-changed-success')
        );
    }

}
