<?php

namespace DreamsArk\Http\Controllers\Home;

use DreamsArk\Http\Controllers\Controller;
use DreamsArk\Models\Project\Project;
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
     * @param \DreamsArk\Models\Project\Project $project
     * @return \Illuminate\Http\Response
     */
    public function index(Project $project)
    {
        return view('index')->with('projects', $project->take(4)->get());
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
