<?php

namespace SkysoulDesign\Translation\Jobs;

use Illuminate\Contracts\Events\Dispatcher;
use Illuminate\Filesystem\Filesystem;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Support\Collection;
use SkysoulDesign\Translation\Events\LanguagesWasCreated;
use SkysoulDesign\Translation\Repositories\TranslationRepositoryInterface;

class ImportLanguagesJob extends Job
{

    use DispatchesJobs;

    /**
     * Create a new command instance.
     */
    public function __construct()
    {
        //
    }

    /**
     * Execute the command.
     *
     * @param Filesystem $fileSystem
     * @param Application $app
     * @param TranslationRepositoryInterface $repository
     * @param Dispatcher $event
     * @return Collection of Group
     */
    public function handle(Filesystem $fileSystem, Application $app, TranslationRepositoryInterface $repository, Dispatcher $event)
    {
        $files = $fileSystem->allFiles($app->langPath());

        /**
         * Retrieves all local languages
         */
        $languages = collect($files)->transform(function ($file) {
            return $file->getRelativePath();
        })->unique();

        /**
         * Save Database instance with all languages
         */
        $database = $repository->languages();

        /**
         * List Only names
         */
        $names = $database->pluck('name');

        /**
         * Create New Language for those which has been set locally
         * but was not present yet on the database
         */
        $newLanguages = $languages->merge($names)->diff($names)->map(function ($name) {
            return $this->dispatch(new CreateLanguageJob($name));
        });

        /**
         * Announce LanguagesWasCreated
         */
        if (!$newLanguages->isEmpty()) $event->fire(new LanguagesWasCreated($newLanguages));

        /**
         * Returns All languages
         */
        return $database->merge($newLanguages);

    }
}
