<?php

namespace SkysoulDesign\I18n\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use SkysoulDesign\I18n\Jobs\CreateGroupJob;
use SkysoulDesign\I18n\Jobs\CreateLanguageJob;
use SkysoulDesign\I18n\Jobs\CreateTranslationJob;
use SkysoulDesign\I18n\Jobs\ExportTranslationJob;
use SkysoulDesign\I18n\Jobs\ImportTranslationJob;
use SkysoulDesign\I18n\Jobs\SyncTranslationJob;
use SkysoulDesign\I18n\Jobs\UpdateTranslationJob;
use SkysoulDesign\I18n\Repositories\TranslationRepositoryInterface;

class TranslationController extends Controller
{
    /**
     * @var \SkysoulDesign\I18n\Repositories\TranslationRepositoryInterface
     */
    private $repository;

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

        $translations = $this->repository->fetch($language, $group)->load('groups', 'language');

        $groups = $this->repository->groups();
        $languages = $this->repository->languages();

        return view('index', compact('translations', 'groups', 'languages'));

    }

    /**
     * Update Language
     *
     * @param $id
     * @param Request $request
     * @return \Illuminate\Http\Response
     * @internal param Translation $translation
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
