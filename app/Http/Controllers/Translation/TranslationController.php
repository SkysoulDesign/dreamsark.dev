<?php

namespace DreamsArk\Http\Controllers\Translation;

use DreamsArk\Commands\Translation\CreateGroupCommand;
use DreamsArk\Commands\Translation\CreateLanguageCommand;
use DreamsArk\Commands\Translation\CreateTranslationCommand;
use DreamsArk\Commands\Translation\ExportTranslationCommand;
use DreamsArk\Commands\Translation\ImportTranslationCommand;
use DreamsArk\Commands\Translation\SyncTranslationCommand;
use DreamsArk\Commands\Translation\UpdateTranslationCommand;
use DreamsArk\Repositories\Translation\TranslationRepositoryInterface;
use Illuminate\Http\Request;
use DreamsArk\Http\Requests;
use DreamsArk\Http\Controllers\Controller;

class TranslationController extends Controller
{
    /**
     * @var TranslationRepositoryInterface
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

        return view('translation.index', compact('translations', 'groups', 'languages'));

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
        $command = new UpdateTranslationCommand($id, $request->all());
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
        $this->dispatch(new ImportTranslationCommand());
        return redirect()->back();
    }

    /**
     * Export Translations
     * @return \Illuminate\Http\Response
     * @internal param Translation $translation
     */
    public function export()
    {
        $this->dispatch(new ExportTranslationCommand());
        return redirect()->back();
    }

    /**
     * Sync All Languages.
     *
     * @return \Illuminate\Http\Response
     */
    public function sync()
    {
        $this->dispatch(new SyncTranslationCommand());
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
        $this->dispatch(new CreateLanguageCommand($request->get('name')));
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
        $this->dispatch(new CreateGroupCommand($request->get('name')));
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
        $command = new CreateTranslationCommand($request->get('language'), $request->get('group'), $request->only('key', 'value'));
        $this->dispatch($command);
        return redirect()->back();
    }

}
