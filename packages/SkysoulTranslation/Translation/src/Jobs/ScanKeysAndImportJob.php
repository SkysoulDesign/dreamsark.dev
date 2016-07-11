<?php

namespace SkysoulDesign\Translation\Jobs;

use Illuminate\Contracts\Events\Dispatcher;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Support\Collection;
use Illuminate\Translation\Translator;
use SkysoulDesign\Translation\Models\Group;
use SkysoulDesign\Translation\Models\Language;
use SkysoulDesign\Translation\Repositories\TranslationRepositoryInterface;
use Symfony\Component\Finder\Finder;

/**
 * Class ScanKeysAndImportJob
 *
 * @package SkysoulDesign\Translation\Jobs
 */
class ScanKeysAndImportJob extends Job
{
    use DispatchesJobs;

    /**
     * ScanKeysAndImportJob constructor.
     */
    public function __construct()
    {
    }

    public function handle(Application $app, Finder $finder, Translator $translator, TranslationRepositoryInterface $repository, Dispatcher $event)
    {

        /**
         * Import Groups
         */
        $groups = $this->dispatch(
            new ImportGroupsJob()
        );

        /**
         * Import Languages
         */
        $languages = dispatch(
            new ImportLanguagesJob()
        );

//        $keyword = "/(?:@lang|trans)\(['\"]+(.*?)['\"]+\)/";
//        $keyword = "/(?:@lang|trans)\(['\"]([^$# {}<>]+?)['\"]\)/";
        $keyword = "/(?:@lang|trans|trans_choice)\\(['\"]([^$# {}<>]+?)['\"][\\),]/"; // with params used in @lang() & trans()

        $files = $finder
            ->files()
            ->name('*.php')
            ->in($app->path())
            ->in($app['config']['view.paths'])
            ->contains($keyword);

        $keywordList = collect();

        foreach ($files as $file) {

            preg_match_all($keyword, $file->getContents(), $output_array);

            foreach ($output_array[1] as $item) {

                $temp = explode('.', $item);

                if (count($temp) === 2)
                    $keywordList->push([
                        'group' => $temp[0],
                        'key' => $temp[1],
                        'value' => null
                    ]);

            }

        }

        /**
         * Get The English Language Language
         */
        $language = $languages->last();

        foreach ($keywordList->groupBy('group') as $name => $keyList) {

            $group = $groups->where('name', $name)->first();

            if (is_null($group))
                $group = $this->dispatch(
                    new CreateGroupJob($name)
                );

            $model = $repository->fetch($language->id, $group->id);

            $database = $model->pluck('value', 'key');

            $newKeys = collect();

            $keyList->each(function ($data) use ($newKeys) {
                $newKeys->put($data['key'], $data['value']);
            });

            $newKeys->merge($database)->diffKeys($database)->map(function ($value, $key) use ($language, $group) {
                return $this->dispatch(
                    new CreateTranslationJob(
                        $language->id, $group->id, compact('key', 'value')
                    )
                );
            });

        }

        /**
         * after inserting new keys to 'en' sync with all languages
         */
        $this->dispatch(
            new SyncTranslationJob()
        );

    }
}
