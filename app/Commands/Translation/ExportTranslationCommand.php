<?php

namespace DreamsArk\Commands\Translation;

use DreamsArk\Commands\Command;
use DreamsArk\Repositories\Translation\TranslationRepositoryInterface;
use Illuminate\Contracts\Bus\SelfHandling;
use Illuminate\Filesystem\Filesystem;
use Illuminate\Foundation\Application;
use Illuminate\Support\Collection;

class ExportTranslationCommand extends Command implements SelfHandling
{
    /**
     * Create a new command instance.
     */
    public function __construct()
    {

    }

    /**
     * Execute the command.
     *
     * @param TranslationRepositoryInterface $repository
     * @param Filesystem $fileSystem
     * @param Application $app
     */
    public function handle(TranslationRepositoryInterface $repository, Filesystem $fileSystem, Application $app)
    {
        /** @var Collection $translations */
        $translations = $repository->all()->load('groups', 'language');

        /**
         * Execute operation for each language within the database
         */
        $translations->groupBy('language.name')->map(function ($translations, $language) use ($app, $fileSystem) {

            /**
             * Divide into groups
             */
            $groups = $translations->map(function ($translation) {
                return $translation->groups->pluck('name');
            })->collapse();

            /**
             * For each group create a separated file
             */
            $groups->each(function ($group) use ($translations, $language, $app, $fileSystem) {

                /**
                 * Filter Trough to get only translations that belongs to this group
                 */
                $content = $translations->filter(function ($translation) use ($group) {
                    return !$translation->groups->where('name', $group)->isEmpty();
                })->lists('value', 'key')->toArray();

                /**
                 * Generate popper output
                 */
                $output = "<?php\n\nreturn " . var_export($content, true) . ";\n";
                $directory = $app->langPath() . '/' . $language;
                $file = $directory . '/' . $group . '.php';

                /**
                 * if Directory doesnt exist then create it
                 */
                if (!$fileSystem->exists($directory)) {
                    $fileSystem->makeDirectory($app->langPath() . '/' . $language);
                }

                /**
                 * if File already exist delete it.
                 */
                if ($fileSystem->exists($file)) $fileSystem->delete($file);

                /**
                 * Write file
                 */
                $fileSystem->put($file, $output);

            });
        });

    }
}
