<?php

namespace DreamsArk\Commands\Translation;

use DreamsArk\Commands\Command;
use DreamsArk\Events\Translation\LanguagesWasCreated;
use DreamsArk\Repositories\Translation\TranslationRepositoryInterface;
use Illuminate\Contracts\Bus\SelfHandling;
use Illuminate\Contracts\Events\Dispatcher;
use Illuminate\Filesystem\Filesystem;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Support\Collection;

class ImportLanguagesCommand extends Command implements SelfHandling
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
            return $this->dispatch(new CreateLanguageCommand($name));
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
