<?php

namespace SkysoulDesign\Translation\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use SkysoulDesign\Translation\Jobs\CreateGroupJob;
use SkysoulDesign\Translation\Jobs\CreateLanguageJob;
use SkysoulDesign\Translation\Jobs\CreateTranslationJob;
use SkysoulDesign\Translation\Jobs\ExportTranslationJob;
use SkysoulDesign\Translation\Jobs\ImportTranslationJob;
use SkysoulDesign\Translation\Jobs\SyncTranslationJob;
use SkysoulDesign\Translation\Jobs\UpdateTranslationJob;
use SkysoulDesign\Translation\Repositories\TranslationRepositoryInterface;

/**
 * Class TranslationController
 *
 * @package SkysoulDesign\Translation\Http\Controllers
 */
class TranslationController extends Controller
{
    /**
     * @var \SkysoulDesign\Translation\Repositories\TranslationRepositoryInterface
     */
    private $repository;

    /**
     * TranslationController constructor.
     *
     * @param \SkysoulDesign\Translation\Repositories\TranslationRepositoryInterface $repository
     */
    public function __construct(TranslationRepositoryInterface $repository)
    {
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     *
     * @param string $language
     * @param string $group
     * @return \Illuminate\Http\Response
     */
    public function index($language = '1', $group = '1')
    {

        dd('test');

        $translations = $this->repository->fetch($language, $group)->load('groups', 'language');

        $groups = $this->repository->groups();
        $languages = $this->repository->languages();

        return view('translation::index', compact('translations', 'groups', 'languages'));

    }

    /**
     * Update Language
     *
     * @param $id
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function update($id, Request $request)
    {
        $command = new UpdateTranslationJob($id, $request->all());
        $status = $this->dispatch($command);

        return response()->json(compact('status'));
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function import()
    {
        $this->dispatch(new ImportTranslationJob());
        return redirect()->back();
    }

    /**
     * Export Translations
     *
     * @return \Illuminate\Http\Response
     * @internal param Translation $translation
     */
    public function export()
    {
        $this->dispatch(new ExportTranslationJob());
        return redirect()->back();
    }

    /**
     * Sync All Languages.
     *
     * @return \Illuminate\Http\Response
     */
    public function sync()
    {
        $this->dispatch(new SyncTranslationJob());
        return redirect()->back();
    }

    /**
     * Create a new Language
     *
     * @param Request $request
     * @return \Illuminate\Http\Response
     * @internal param Translation $translation
     */
    public function newLanguage(Request $request)
    {
        $this->dispatch(new CreateLanguageJob($request->get('name')));
        return redirect()->back();
    }

    /**
     * Create a new Group
     *
     * @param Request $request
     * @return \Illuminate\Http\Response
     * @internal param Translation $translation
     */
    public function newGroup(Request $request)
    {
        $this->dispatch(new CreateGroupJob($request->get('name')));
        return redirect()->back();
    }

    /**
     * Create New Language Key
     *
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function newTranslation(Request $request)
    {
        $command = new CreateTranslationJob($request->get('language'), $request->get('group'), $request->only('key', 'value'));
        $this->dispatch($command);
        return redirect()->back();
    }

}
