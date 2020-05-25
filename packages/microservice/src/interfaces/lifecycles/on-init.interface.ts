
export interface IOnInit {
    onInit(): Promise<void> | void;
}

export const OnInit: keyof IOnInit = 'onInit';
