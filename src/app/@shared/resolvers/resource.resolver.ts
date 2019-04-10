import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Resource } from 'src/app/@core/models/resource.model';
import { ResourceService } from 'src/app/@core/services/resource.service';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { RouterStateService } from 'src/app/@core/services/router.state.service';
import { Injector } from '@angular/core';

export abstract class ResourceResolver<Model extends Resource<Model>, ModelService extends ResourceService<Model>> implements Resolve<Model>
{

    protected routerService: RouterStateService;
    protected resourceService: ModelService;
    protected routeParam: string;
    protected apiIncludes: string;

    constructor(injector: Injector)
    {
        this.routerService = injector.get(RouterStateService);

        if (!this.routeParam) {
            this.routeParam = 'id';
        }
    }

    abstract makeDefaultInstance(): Model;

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Model>
    {
        if (!this.isValidParam(route)) {
            return of(this.makeDefaultInstance());
        }

        return this.resolveData(route);
    }

    protected isValidParam(route: ActivatedRouteSnapshot): boolean
    {
        return route.params[this.routeParam] != undefined;
    }

    protected resolveData(route: ActivatedRouteSnapshot): Observable<Model>
    {
        return this.resourceService.one(route.params[this.routeParam], this.makeParams())
            .pipe(
                map(apiResponse => apiResponse.getItem()),
                catchError(() => {
                    this.routerService.navigate(['404']);

                    return of(this.makeDefaultInstance());
                })
            );
    }

    protected makeParams(): any
    {
        if (!this.apiIncludes) {
            return {};
        }

        return {
            'include': this.apiIncludes
        }
    }
}
