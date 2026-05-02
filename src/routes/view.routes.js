import { Router } from 'express';

const router = Router();

router.get('/',                (req, res) => res.redirect('/signIn'));
router.get('/signIn',          (req, res) => res.render('signIn',          { title: 'Iniciar sesión' }));
router.get('/signUp',          (req, res) => res.render('signUp',          { title: 'Registrarse' }));
router.get('/profile',         (req, res) => res.render('profile',         { title: 'Mi perfil' }));
router.get('/dashboard/user',  (req, res) => res.render('dashboard-user',  { title: 'Dashboard' }));
router.get('/dashboard/admin', (req, res) => res.render('dashboard-admin', { title: 'Administración' }));
router.get('/403',             (req, res) => res.status(403).render('403', { title: 'Acceso denegado' }));

export default router;
